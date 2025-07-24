const { BillSundryTransaction,TaxTransaction } = require("../../models");
const validateRequest = require("../validateRequest");
const commonQuery = require("../commonQuery");
const { ItemMaster } = require('../../models');

exports.getProductDetail = async (product_id, transaction = null) => {
  if (!product_id) return null;

  const product = await commonQuery.findOneById(ItemMaster, product_id, transaction);

  return product;
};

exports.fixDecimals = async (value, digits = 5) => {
  if (isNaN(value)) return "0." + "0".repeat(digits);
  // Use Math.ceil to always round up
  const factor = Math.pow(10, digits);
  return (Math.ceil(Number(value) * factor) / factor).toFixed(digits);
}
