const {
  ReserveStock,
  StockGeneralTransaction,
  StockTransaction,
} = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");
const { getProductDetail, fixDecimals } = require("../../helpers/functions/commonFucntions");
const { Op, literal } = require("sequelize");

const MODULE = "Reserve Stock";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    product_id: "Product",
    product_base_qty: "Product QTY",
    stock_flage: "Stock Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  // Step 2: Now req.body is available
  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ReserveStock, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read all
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ReserveStock, {
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
    const record = await commonQuery.findOneById(ReserveStock, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    product_id: "Product",
    product_base_qty: "Product QTY",
    stock_flage: "Stock Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(
      ReserveStock,
      req.params.id,
      req.body
    );
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(
      ReserveStock,
      req.params.id
    );
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getReserveStock = async (req, res) => {
  const {
    unit_id,
    branch_id,
    godown_id,
    customer_id,
    batch_id,
    reserve_id,
    request_id,
    complaint_id,
    sales_order_trn_id,
    is_store_approval,
    p_id,
    without_store_release,
  } = req.query;

  const company_id = req.body.company_id;

  try {
    const baseWhere = {
      ...(company_id ? { company_id } : {}),
      ...(branch_id ? { branch_id } : {}),
      ...(godown_id ? { godown_id } : {}),
      ...(customer_id ? { customer_id } : {}),
      ...(batch_id ? { stock_id: { [Op.in]: batch_id.split(",") } } : {}),
      ...(reserve_id ? { reserve_id } : {}),
      ...(request_id ? { request_id } : {}),
      ...(complaint_id ? { complaint_id } : {}),
      ...(sales_order_trn_id ? { sales_order_trn_id } : {}),
      ...(p_id ? { p_id } : {}),
      ...(without_store_release
        ? { ref_name: { [Op.ne]: "store_release" } }
        : {}),
    };

    // ✅ Use common findAllRecords for approved stock
    const approvedStock = await commonQuery.findAllRecords(
      ReserveStock,
      {
        ...baseWhere,
        stock_flag: 1,
      },
      false, // includeDeleted
      {
        attributes: [
          "product_id",
          [
            sequelize.fn("SUM", sequelize.col("product_base_qty")),
            "total_product_base",
          ],
          [
            sequelize.fn("SUM", sequelize.col("product_convert_qty")),
            "total_product_convert",
          ],
        ],
        group: ["product_id"],
      }
    );

    // ✅ Use common findAllRecords for used stock
    const usedStock = await commonQuery.findAllRecords(
      ReserveStock,
      {
        ...baseWhere,
        stock_flag: 2,
      },
      false,
      {
        attributes: [
          "product_id",
          [
            sequelize.fn("SUM", sequelize.col("product_base_qty")),
            "total_used_base",
          ],
          [
            sequelize.fn("SUM", sequelize.col("product_convert_qty")),
            "total_used_convert",
          ],
        ],
        group: ["product_id"],
      }
    );

    // 🧮 Merge approved and used to calculate available stock
    const result = approvedStock.map((appr) => {
      const prodId = appr.product_id;
      const used = usedStock.find((u) => u.product_id === prodId);

      const approveBase = fixDecimals(appr.get("total_product_base") || 0);
      const approveConvert = fixDecimals(appr.get("total_product_convert") || 0);
      const usedBase = fixDecimals(used?.get("total_used_base") || 0);
      const usedConvert = fixDecimals(used?.get("total_used_convert") || 0);

      return {
        product_id: prodId,
        reserve_base_qty: fixDecimals(approveBase - usedBase),
        reserve_convert_qty: fixDecimals(approveConvert - usedConvert),
      };
    });

    return res.success("RESERVE_STOCK_FETCHED", "RESERVE", result);
  } catch (err) {
    console.error("getReserveStock error:", err);
    return res.error("SERVER_ERROR", "RESERVE", { error: err.message });
  }
};