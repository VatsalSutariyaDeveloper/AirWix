const {
  StockGeneral,
  StockGeneralTransaction,
  BatchStockIn,
  StockGeneralApprovalLog,
  StockTransaction,
} = require("../../models"); // Use models/index.js
const validateRequest = require("../../helpers/validateRequest");
const {
  enterProductionStockEffect,
  deleteProductStockEffect,
  itemReserveStockEntry,
} = require("../../helpers/functions/inventoryFunctions");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");
const { convertStock } = require("../../helpers/functions/helperFunction");
const { Op, literal } = require("sequelize");
const { getProductDetail, fixDecimals } = require("../../helpers/functions/commonFucntions");

const MODULE = "Stock General";
// Create General Stock with Transactions (Insert Only)
exports.create = async (req, res) => {
  const requiredFields = {
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const { branch_id, stock_general_date, remark, stock_general_transaction } =
    req.body;

  if (
    !Array.isArray(stock_general_transaction) ||
    stock_general_transaction.length === 0
  ) {
    return res.error("VALIDATION_ERROR", {
      errors: ["stock_general_transaction must be a non-empty array."],
    });
  }

  const company_id = req.body.company_id;
  const user_id = req.body.user_id;
  const resolvedBranchId = branch_id || req.user.branch_id;
  const transaction = await sequelize.transaction();

  try {
    const generalStockInfo = {
      remark,
      user_id,
      company_id,
      branch_id: resolvedBranchId,
    };

    const insertedStock = await commonQuery.createRecord(
      StockGeneral,
      generalStockInfo,
      transaction
    );
    const stock_general_id = insertedStock.id;

    for (const trn of stock_general_transaction) {
      console.log("Processing transaction:", trn);
      const {
        product_id,
        product_unit,
        product_base_unit,
        product_convert_unit,
        product_qty,
        product_base_qty,
        product_conv_qty,
        product_amount,
        product_convert_amount,
        sales_order_id,
        for_user_id,
        stock_flag,
        stock_transaction,
      } = trn;

      const productDetail = await getProductDetail(product_id, transaction);

      const trnData = {
        product_id,
        product_unit,
        product_base_unit,
        product_convert_unit,
        product_qty: fixDecimals(product_qty),
        product_base_qty: fixDecimals(product_base_qty),
        product_conv_qty: fixDecimals(product_conv_qty),
        stock_flag,
        product_amount: fixDecimals(product_amount, 2),
        product_convert_amount: fixDecimals(product_convert_amount, 2),
        stock_general_id,
        sales_order_id,
        for_user_id,
        user_id,
        company_id,
        branch_id: resolvedBranchId,
      };

      const insertTrn = await commonQuery.createRecord(
        StockGeneralTransaction,
        trnData,
        transaction
      );
      const generalStockTrnId = insertTrn.id;

      for (const selStock of stock_transaction || []) {
        const { stock_id, godown_id, batch_no } = selStock;
        const total_base_stock = fixDecimals(selStock.total_base_stock);

        if (stock_flag == 2) {
          if (stock_id === 0) {
            const stockTrnList = await commonQuery.findAllRecords(
              StockTransaction,
              {
                [Op.and]: [
                  { status: 0 },
                  { stock_flag: 1 },
                  { product_id },
                  { godown_id },
                  literal(
                    "CAST(product_base_qty AS DECIMAL(15,5)) > CAST(used_base_qty AS DECIMAL(15,5))"
                  ),
                ],
              },
              false,
              {
                order: [["id", "ASC"]],
              },
              transaction
            );

            let totalAvailableStock = 0;

            for (const stockTrn of stockTrnList) {
              let pendingStock = 0;

              if (stockTrn.product_convert_unit === product_unit) {
                pendingStock =
                  fixDecimals(stockTrn.product_convert_qty) - fixDecimals(stockTrn.used_convert_qty);
              } else {
                pendingStock =
                  fixDecimals(stockTrn.product_base_qty) - fixDecimals(stockTrn.used_base_qty);
              }

              totalAvailableStock += fixDecimals(pendingStock);
            }

            totalAvailableStock = fixDecimals(totalAvailableStock);

            if (totalAvailableStock < total_base_stock) {
              await transaction.rollback();
              return res.error("VALIDATION_ERROR", {
                errors: [
                  `Insufficient stock for product ID ${product_id} in godown ID ${godown_id}. Required: ${total_base_stock}, Available: ${totalAvailableStock}`,
                ],
              });
            }

            let remainingQty = total_base_stock;
            const itemUnit = product_unit;

            for (const stockTrn of stockTrnList) {
              let availableStock = 0;

              if (stockTrn.product_convert_unit === itemUnit) {
                availableStock =
                  fixDecimals(stockTrn.product_convert_qty) - fixDecimals(stockTrn.used_convert_qty);
              } else {
                availableStock =
                  fixDecimals(stockTrn.product_base_qty) - fixDecimals(stockTrn.used_base_qty);
              }

              if (remainingQty <= 0) break;

              availableStock = fixDecimals(availableStock);

              const deductQty = Math.min(availableStock, remainingQty);
              remainingQty -= fixDecimals(deductQty);

              let base_stock = 0;
              let con_stock = 0;

              if (itemUnit === productDetail.purchase_unit) {
                const type = "base_unit";
                con_stock = fixDecimals(deductQty);
                base_stock = fixDecimals(await convertStock(con_stock, product_id, type));
              } else {
                const type = "conv_unit";
                base_stock = fixDecimals(deductQty);
                con_stock = fixDecimals(await convertStock(base_stock, product_id, type));
              }

              await itemReserveStockEntry(
                transaction,
                product_id,
                productDetail.production_unit,
                productDetail.purchase_unit,
                base_stock,
                con_stock,
                "Stock General",
                generalStockTrnId,
                stockTrn.id,
                godown_id,
                branch_id,
                user_id,
                company_id
              );
            }
          } else {
            let base_stock = 0;
            let con_stock = 0;

            if (product_unit === productDetail.purchase_unit) {
              const type = "base_unit";
              con_stock = fixDecimals(total_base_stock);
              base_stock = fixDecimals(await convertStock(con_stock, product_id, type));
            } else {
              const type = "conv_unit";
              base_stock = fixDecimals(total_base_stock);
              con_stock = fixDecimals(await convertStock(base_stock, product_id, type));
            }

            const stockTrn = await commonQuery.findOneById(StockTransaction, selStock.stock_id, transaction);
            if (stockTrn.id) {
              await itemReserveStockEntry(
                transaction,
                product_id,
                productDetail.production_unit,
                productDetail.purchase_unit,
                base_stock,
                con_stock,
                "Stock General",
                generalStockTrnId,
                stockTrn.id,
                godown_id,
                branch_id,
                user_id,
                company_id
              );
            }
          }
        } else {
          let currentBatchNo = batch_no;

          const batchData = {
            stock_general_trn_id: generalStockTrnId,
            batch_stock_no:
              productDetail.batch_wise_stock_manage == 1
                ? currentBatchNo
                : null,
            godown_id,
            product_qty: fixDecimals(total_base_stock),
            product_unit: product_unit,
            user_id,
            company_id,
            branch_id: resolvedBranchId,
          };

          await commonQuery.createRecord(BatchStockIn, batchData, transaction);
        }
      }
    }

    await transaction.commit();
    return res.success("STOCK_GENERAL_CREATED", "STOCK", { stock_general_id });
  } catch (err) {
    await transaction.rollback();
    console.error("General Stock Create Error:", err);
    return res.error("SERVER_ERROR", "STOCK", { error: err.message });
  }
};

// Read all
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(StockGeneral, {
      status: 0,
    });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(StockGeneral, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
// Updated `update` function to match the `create` logic
exports.update = async (req, res) => {
  const requiredFields = {
    stock_general_id: "General Stock ID",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const { stock_general_id, branch_id, remark, stock_general_transaction } =
    req.body;

  if (
    !Array.isArray(stock_general_transaction) ||
    stock_general_transaction.length === 0
  ) {
    return res.error("VALIDATION_ERROR", {
      errors: ["stock_general_transaction must be a non-empty array."],
    });
  }

  const company_id = req.body.company_id;
  const user_id = req.body.user_id;
  const resolvedBranchId = branch_id || req.user.branch_id;
  const transaction = await sequelize.transaction();

  try {
    // Update StockGeneral
    const generalStockInfo = {
      remark,
      user_id,
      company_id,
      branch_id: resolvedBranchId,
    };

    await commonQuery.updateRecordById(
      StockGeneral,
      { id: stock_general_id },
      generalStockInfo,
      transaction
    );

    // Delete existing transactions and batch records
    const oldTransactions = await commonQuery.findAllRecords(
      StockGeneralTransaction,
      {
        stock_general_id,
      },
      false,
      {},
      transaction
    );

    for (const oldTrn of oldTransactions) {
      await commonQuery.softDeleteById(
        BatchStockIn,
        {
          stock_general_trn_id: oldTrn.id,
        },
        transaction
      );
    }

    await commonQuery.softDeleteById(
      StockGeneralTransaction,
      {
        stock_general_id,
      },
      transaction
    );

    // Re-insert updated transactions
    for (const trn of stock_general_transaction) {
      const {
        product_id,
        product_unit,
        product_base_unit,
        product_convert_unit,
        product_qty,
        product_base_qty,
        product_conv_qty,
        product_amount,
        product_convert_amount,
        sales_order_id,
        for_user_id,
        stock_flag,
        stock_transaction,
      } = trn;

      const productDetail = await getProductDetail(product_id, transaction);

      const trnData = {
        product_id,
        product_unit,
        product_base_unit,
        product_convert_unit,
        product_qty: fixDecimals(product_qty),
        product_base_qty: fixDecimals(product_base_qty),
        product_conv_qty: fixDecimals(product_conv_qty),
        stock_flag,
        product_amount: fixDecimals(product_amount, 2),
        product_convert_amount: fixDecimals(product_convert_amount, 2),
        stock_general_id,
        sales_order_id,
        for_user_id,
        user_id,
        company_id,
        branch_id: resolvedBranchId,
      };

      const insertTrn = await commonQuery.createRecord(
        StockGeneralTransaction,
        trnData,
        transaction
      );

      const generalStockTrnId = insertTrn.id;

      for (const selStock of stock_transaction || []) {
        const { stock_id, total_base_stock, godown_id, batch_no } = selStock;
        const fixedTotalBaseStock = fixDecimals(total_base_stock);

        if (stock_flag == 2) {
          if (stock_id === 0) {
            const stockTrnList = await commonQuery.findAllRecords(
              StockTransaction,
              {
                [Op.and]: [
                  { status: 0 },
                  { stock_flag: 1 },
                  { product_id },
                  { godown_id },
                  literal(
                    "CAST(product_base_qty AS DECIMAL(15,5)) > CAST(used_base_qty AS DECIMAL(15,5))"
                  ),
                ],
              },
              false,
              { order: [["id", "ASC"]] },
              transaction
            );

            // Calculate total available stock
            let totalAvailableStock = 0;

            for (const stockTrn of stockTrnList) {
              let pendingStock = 0;

              if (stockTrn.product_convert_unit === product_unit) {
                pendingStock =
                  fixDecimals(stockTrn.product_convert_qty) - fixDecimals(stockTrn.used_convert_qty);
              } else {
                pendingStock =
                  fixDecimals(stockTrn.product_base_qty) - fixDecimals(stockTrn.used_base_qty);
              }

              totalAvailableStock += fixDecimals(pendingStock);
            }

            totalAvailableStock = fixDecimals(totalAvailableStock);

            // If insufficient, rollback and exit
            if (totalAvailableStock < fixedTotalBaseStock) {
              await transaction.rollback();
              return res.error("VALIDATION_ERROR", {
                errors: [
                  `Insufficient stock for product ID ${product_id} in godown ID ${godown_id}. Required: ${fixedTotalBaseStock}, Available: ${totalAvailableStock}`,
                ],
              });
            }

            let remainingQty = fixedTotalBaseStock;
            const itemUnit = product_unit;

            for (const stockTrn of stockTrnList) {
              let availableStock = 0;
              if (stockTrn.product_convert_unit === itemUnit) {
                availableStock =
                  fixDecimals(stockTrn.product_convert_qty) - fixDecimals(stockTrn.used_convert_qty);
              } else {
                availableStock =
                  fixDecimals(stockTrn.product_base_qty) - fixDecimals(stockTrn.used_base_qty);
              }

              if (remainingQty <= 0) break;

              availableStock = fixDecimals(availableStock);

              const deductQty = Math.min(availableStock, remainingQty);
              remainingQty -= fixDecimals(deductQty);

              let base_stock = 0;
              let con_stock = 0;

              if (itemUnit === productDetail.purchase_unit) {
                const type = "base_unit";
                con_stock = fixDecimals(deductQty);
                base_stock = fixDecimals(await convertStock(con_stock, product_id, type));
              } else {
                const type = "conv_unit";
                base_stock = fixDecimals(deductQty);
                con_stock = fixDecimals(await convertStock(base_stock, product_id, type));
              }

              await itemReserveStockEntry(
                transaction,
                product_id,
                productDetail.production_unit,
                productDetail.purchase_unit,
                base_stock,
                con_stock,
                "Stock General",
                generalStockTrnId,
                stockTrn.id,
                godown_id,
                branch_id,
                user_id,
                company_id
              );
            }
          } else {
            let base_stock = 0;
            let con_stock = 0;

            if (product_unit === productDetail.purchase_unit) {
              const type = "base_unit";
              con_stock = fixDecimals(fixedTotalBaseStock);
              base_stock = fixDecimals(await convertStock(con_stock, product_id, type));
            } else {
              const type = "conv_unit";
              base_stock = fixDecimals(fixedTotalBaseStock);
              con_stock = fixDecimals(await convertStock(base_stock, product_id, type));
            }

            const stockTrn = await commonQuery.findOneById(StockTransaction, stock_id, transaction);
            if (stockTrn && stockTrn.id) {
              await itemReserveStockEntry(
                transaction,
                product_id,
                productDetail.production_unit,
                productDetail.purchase_unit,
                base_stock,
                con_stock,
                "Stock General",
                generalStockTrnId,
                stockTrn.id,
                godown_id,
                branch_id,
                user_id,
                company_id
              );
            }
          }
        } else {
          let currentBatchNo = batch_no;

          const batchData = {
            stock_general_trn_id: generalStockTrnId,
            batch_stock_no:
              productDetail.batch_wise_stock_manage == 1
                ? currentBatchNo
                : null,
            godown_id,
            product_qty: fixDecimals(fixedTotalBaseStock),
            product_unit: product_unit,
            user_id,
            company_id,
            branch_id: resolvedBranchId,
          };

          await commonQuery.createRecord(BatchStockIn, batchData, transaction);
        }
      }
    }

    await transaction.commit();
    return res.success("STOCK_GENERAL_UPDATED", "STOCK", { stock_general_id });
  } catch (err) {
    await transaction.rollback();
    console.error("General Stock Update Error:", err);
    return res.error("SERVER_ERROR", "STOCK", { error: err.message });
  }
};

exports.approveStockGeneral = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { approve_remark, approve_status, stock_general_id } = req.body;
    const user_id = req.body.user_id;
    const company_id = req.body.company_id;
    const branch_id = req.body.branch_id || req.user.branch_id;

    // Insert approval log
    const approvalLog = await commonQuery.createRecord(
      StockGeneralApprovalLog,
      {
        remark: approve_remark,
        approve_status,
        stock_general_id,
        user_id,
        company_id,
        branch_id,
      },
      transaction
    );
    if (approve_status === 1) {
      await enterProductionStockEffect(
        stock_general_id,
        user_id,
        company_id,
        branch_id,
        transaction
      );
    } else {
      await deleteProductStockEffect(stock_general_id, transaction);
    }

    // Update stock approval status
    await commonQuery.updateRecordById(
      StockGeneral,
      { id: stock_general_id },
      { approval_status: approve_status },
      transaction
    );
    await transaction.commit();
    res.status(200).json({ success: true, message: "Stock approval updated" });
  } catch (error) {
    await transaction.rollback();
    console.error("Stock Approval Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete (soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(
      StockTransaction,
      req.params.id
    );
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getStock = async (req, res) => {
  const { product_id, godown_id } = req.body;

  try {
    const filters = {
      stock_flag: 1,
      status: 0,
    };

    if (product_id) filters.product_id = product_id;
    if (godown_id) filters.godown_id = godown_id;

    const stockList = await commonQuery.findAllRecords(
      StockTransaction,
      {
        ...filters,
        [Op.and]: [
          literal(
            "CAST(product_base_qty AS DECIMAL(15,5)) > CAST(used_base_qty AS DECIMAL(15,5))"
          ),
        ],
      },
      false,
      {
        order: [["product_id", "ASC"]],
      }
    );

    const productMap = {};

    for (const stock of stockList) {
      const pid = stock.product_id;

      const availableBaseQty =
        fixDecimals(stock.product_base_qty) - fixDecimals(stock.used_base_qty);
      const availableConvertQty =
        fixDecimals(stock.product_convert_qty) - fixDecimals(stock.used_convert_qty);

      if (!productMap[pid]) {
        const productDetail = await getProductDetail(pid);

        productMap[pid] = {
          product_id: pid,
          product_name: productDetail?.item_name || "",
          available_base_qty: 0,
          available_convert_qty: 0,
          unit: productDetail?.purchase_unit || "",
          godown_id: godown_id || "ALL",
          batches: [],
        };
      }

      productMap[pid].available_base_qty = fixDecimals(productMap[pid].available_base_qty + availableBaseQty);
      productMap[pid].available_convert_qty = fixDecimals(productMap[pid].available_convert_qty + availableConvertQty);

      productMap[pid].batches.push({
        stock_trn_id: stock.id,
        batch_no: stock.batch_no,
        available_base_qty: fixDecimals(availableBaseQty),
        available_convert_qty: fixDecimals(availableConvertQty),
        godown_id: stock.godown_id,
      });
    }

    return res.success("STOCK_FETCHED", "STOCK", Object.values(productMap));
  } catch (err) {
    console.error("getStockByProduct error:", err);
    return res.error("SERVER_ERROR", "STOCK", { error: err.message });
  }
};


exports.deleteDeductStock = async (req, res) => {
  const { stock_general_id } = req.params;
  const { company_id } = req.body;
  const transaction = await sequelize.transaction();

  if (!stock_general_id) {
    return res.error("ID_REQUIRED", "RESERVE", {
      message: "stock_general_id is required.",
    });
  }

  try {
    // Step 1: Get all stock_general_transactions related to stock_general_id
    const stockGeneralTransactions = await commonQuery.findAllRecords(
      StockGeneralTransaction,
      {
        stock_general_id,
        ...(company_id ? { company_id } : {}),
      },
      transaction
    );

    if (!stockGeneralTransactions.length) {
      return res.error("NOT_FOUND", "RESERVE", {
        message: "No related stock transactions found.",
      });
    }

    const transactionIds = stockGeneralTransactions.map((t) => t.id);

    // Step 2: Get reserve stock entries linked to those transactions
    const reserveStocks = await commonQuery.findAllRecords(
      ReserveStock,
      {
        ref_name: "Stock General",
        ref_id: { [Op.in]: transactionIds },
        ...(company_id ? { company_id } : {}),
      },
      transaction
    );

    if (!reserveStocks.length) {
      return res.error("NOT_FOUND", "RESERVE", {
        message: "No related reserve stock entries found.",
      });
    }

    const reserveIds = reserveStocks.map((r) => r.id);

    // Step 3: Deduct used qty from original stock transactions
    for (const reserve of reserveStocks) {
      if (!reserve.stock_id) continue; // skip if stock_id is missing

      const stockTrn = await commonQuery.findOneById(
        StockTransaction,
        reserve.stock_id,
        transaction
      );

      if (stockTrn) {
        await commonQuery.updateRecordById(
          StockTransaction,
          { id: stockTrn.id },
          {
            used_base_qty: fixDecimals(Number(stockTrn.used_base_qty || 0) - Number(reserve.product_base_qty || 0)),
            used_convert_qty: fixDecimals(Number(stockTrn.used_convert_qty || 0) - Number(reserve.product_convert_qty || 0)),
          },
          transaction,
          true
        );
      }
    }

    // Step 4: Soft delete reserve stock entries
    await commonQuery.softDeleteById(
      ReserveStock,
      { id: { [Op.in]: reserveIds } },
      transaction
    );

    // Step 5: Soft delete related stock transactions (child entries)
    await commonQuery.softDeleteById(
      StockTransaction,
      { reserve_id: { [Op.in]: reserveIds }, ref_name: "Stock General" },
      transaction
    );

    await commonQuery.softDeleteById(
      StockGeneralTransaction,
      { stock_general_id },
      transaction
    );

    await commonQuery.softDeleteById(
      StockGeneral,
      { id: stock_general_id },
      transaction
    );

    await transaction.commit();

    return res.success("RESERVE_STOCK_DELETED", "RESERVE", {
      message: "Related reserve stock entries deleted successfully.",
    });

  } catch (error) {
    await transaction.rollback();
    console.error("deleteReserveStock error:", error);
    return res.error("SERVER_ERROR", "RESERVE", { error: error.message });
  }
};

exports.deleteAddStock = async (req, res) => {
  const { stock_general_id } = req.params;
  const { company_id } = req.body;
  const transaction = await sequelize.transaction();

  if (!stock_general_id) {
    return res.error("ID_REQUIRED", "RESERVE", {
      message: "stock_general_id is required.",
    });
  }

  try {
    // Step 1: Get StockGeneralTransactions (stock_flag = 1 for Add Stock)
    const generalTrns = await commonQuery.findAllRecords(
      StockGeneralTransaction,
      {
        stock_general_id,
        ...(company_id ? { company_id } : {}),
      },
      transaction
    );

    if (!generalTrns.length) {
      return res.error("NOT_FOUND", "RESERVE", {
        message: "No add stock transactions found.",
      });
    }

    const trnIds = generalTrns.map((t) => t.id);

    // Soft delete BatchStockIn
    await commonQuery.softDeleteById(
      BatchStockIn,
      { stock_general_trn_id: { [Op.in]: trnIds } },
      transaction
    );

    // Soft delete StockTransaction and deduct used qty if needed
    const stockTransactions = await commonQuery.findAllRecords(
      StockTransaction,
      { ref_id: { [Op.in]: trnIds }, ref_name: "Stock General" },
      transaction
    );

    for (const stockTrn of stockTransactions) {
      await commonQuery.updateRecordById(
        StockTransaction,
        { id: stockTrn.id },
        {
          used_base_qty: fixDecimals(Number(stockTrn.used_base_qty || 0) - Number(stockTrn.product_base_qty || 0)),
          used_convert_qty: fixDecimals(Number(stockTrn.used_convert_qty || 0) - Number(stockTrn.product_convert_qty || 0)),
        },
        transaction,
        true
      );
    }

    await commonQuery.softDeleteById(
      StockTransaction,
      { ref_id: { [Op.in]: trnIds }, ref_name: "Stock General" },
      transaction
    );

    await commonQuery.softDeleteById(
      StockGeneralTransaction,
      { stock_general_id },
      transaction
    );

    await commonQuery.softDeleteById(
      StockGeneral,
      { id: stock_general_id },
      transaction
    );

    await transaction.commit();

    return res.success("RESERVE_ADD_STOCK_DELETED", "RESERVE", {
      message: "Reserve add stock entries deleted successfully.",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("deleteReserveAddStock error:", error);
    return res.error("SERVER_ERROR", "RESERVE", { error: error.message });
  }
};
