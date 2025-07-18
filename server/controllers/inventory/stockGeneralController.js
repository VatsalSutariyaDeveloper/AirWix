const { StockGeneral, StockGeneralTransaction, BatchStockIn, StockGeneralApprovalLog } = require("../../models/inventoryModels"); // Use models/index.js
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");

const MODULE = "Stock General";
// Create General Stock with Transactions (Insert Only)
exports.create = async (req, res) => {
  const requiredFields = {
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  // Step 2: Now req.body is available
  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const { branch_id, stock_general_date, remark, stock_general_transaction } = req.body;

  // Validate transaction array
  if (!Array.isArray(stock_general_transaction) || stock_general_transaction.length === 0) {
    return res.error("VALIDATION_ERROR", {
      errors: ["stock_general_transaction must be a non-empty array."]
    });
  }

  const company_id = req.body.company_id;
  const user_id = req.body.user_id;
  const resolvedBranchId = branch_id || req.user.branch_id;

  try {
    // Generate general stock number
    // const general_stock_no = await loadCommonNo(STOCK_GENERAL_SERIES);

    // Insert StockGeneral record
    const generalStockInfo = {
      remark,
      user_id,
      company_id,
      branch_id: resolvedBranchId,
    };

    const insertedStock = await commonQuery.createRecord(StockGeneral, generalStockInfo);
    const stock_general_id = insertedStock.id;

    // Insert each transaction
    for (const trn of stock_general_transaction) {
      const {
        product_id, product_unit, product_base_unit, product_convert_unit,
        product_qty, product_base_qty, product_conv_qty,
        product_amount, product_convert_amount,
        sales_order_id, for_user_id,
        total_base_stock, godown_id, batch_no, stock_type
      } = trn;

      // const productDetail = await getProductDetail(product_id);
      const productDetail = [batch_wise_stock_manage=0];

      const trnData = {
        product_id,
        product_unit,
        product_base_unit,
        product_convert_unit,
        product_qty,
        product_base_qty,
        product_conv_qty,
        stock_type,
        product_amount,
        product_convert_amount,
        stock_general_id,
        sales_order_id,
        for_user_id,
        user_id,
        company_id,
        branch_id: resolvedBranchId,
      };

      const insertTrn = await commonQuery.createRecord(StockGeneralTransaction, trnData);
      const generalStockTrnId = insertTrn.id;

      // Insert related batch records
      for (let i = 0; i < total_base_stock.length; i++) {
        let currentBatchNo = batch_no[i];

        // Generate new batch no if required
        if (productDetail.batch_wise_stock_manage == 1) {
          currentBatchNo = await getBatchNo(product_id);
        }

        const batchData = {
          stock_general_trn_id: generalStockTrnId,
          batch_stock_no: productDetail.batch_wise_stock_manage == 1 ? currentBatchNo : null,
          godown_id: godown_id[i],
          product_qty: total_base_stock[i],
          product_unit,
          user_id,
          company_id,
          branch_id: resolvedBranchId,
        };

        await commonQuery.createRecord(BatchStockIn, batchData);

        if (productDetail.batch_wise_stock_manage == 1) {
          await updateBatchNo(product_id);
        }
      }
    }

    // await updateCommonNo(STOCK_GENERAL_SERIES);

    return res.success("STOCK_GENERAL_CREATED", "STOCK", { stock_general_id });
  } catch (err) {
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
    const record = await commonQuery.findOneById(
      StockGeneral,
      req.params.id
    );
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    stock_general_id: "General Stock ID",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const {
    stock_general_id,
    branch_id,
    remark,
    stock_general_transaction
  } = req.body;

  if (!Array.isArray(stock_general_transaction) || stock_general_transaction.length === 0) {
    return res.error("VALIDATION_ERROR", {
      errors: ["stock_general_transaction must be a non-empty array."]
    });
  }

  const company_id = req.body.company_id;
  const user_id = req.body.user_id;
  const resolvedBranchId = branch_id || req.user.branch_id;

  try {
    // 1. Update StockGeneral
    const generalStockInfo = {
      remark,
      user_id,
      company_id,
      branch_id: resolvedBranchId,
    };

    await commonQuery.updateRecordById(StockGeneral, { id: stock_general_id }, generalStockInfo);

    // 2. Delete existing transactions and batch records
    const oldTransactions = await commonQuery.findAllRecords(StockGeneralTransaction, {
      stock_general_id
    });

    for (const oldTrn of oldTransactions) {
      await commonQuery.softDeleteById(BatchStockIn, { stock_general_trn_id: oldTrn.id });
    }

    await commonQuery.softDeleteById(StockGeneralTransaction, { stock_general_id });

    // 3. Re-insert transactions
    for (const trn of stock_general_transaction) {
      const {
        product_id, product_unit, product_base_unit, product_convert_unit,
        product_qty, product_base_qty, product_conv_qty,
        product_amount, product_convert_amount,
        sales_order_id, for_user_id,
        total_base_stock, godown_id, batch_no, stock_type
      } = trn;

      const productDetail = [batch_wise_stock_manage=0]; // Replace this with actual product fetch logic

      const trnData = {
        product_id,
        product_unit,
        product_base_unit,
        product_convert_unit,
        product_qty,
        product_base_qty,
        product_conv_qty,
        stock_type,
        product_amount,
        product_convert_amount,
        stock_general_id,
        sales_order_id,
        for_user_id,
        user_id,
        company_id,
        branch_id: resolvedBranchId,
      };

      const insertTrn = await commonQuery.createRecord(StockGeneralTransaction, trnData);
      const generalStockTrnId = insertTrn.id;

      // Insert batch stock entries
      for (let i = 0; i < total_base_stock.length; i++) {
        let currentBatchNo = batch_no[i];

        if (productDetail.batch_wise_stock_manage == 1) {
          currentBatchNo = await getBatchNo(product_id);
        }

        const batchData = {
          stock_general_trn_id: generalStockTrnId,
          batch_stock_no: productDetail.batch_wise_stock_manage == 1 ? currentBatchNo : null,
          godown_id: godown_id[i],
          product_qty: total_base_stock[i],
          product_unit,
          user_id,
          company_id,
          branch_id: resolvedBranchId,
        };

        await commonQuery.createRecord(BatchStockIn, batchData);

        if (productDetail.batch_wise_stock_manage == 1) {
          await updateBatchNo(product_id);
        }
      }
    }

    return res.success("STOCK_GENERAL_UPDATED", "STOCK", { stock_general_id });
  } catch (err) {
    console.error("General Stock Update Error:", err);
    return res.error("SERVER_ERROR", "STOCK", { error: err.message });
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
