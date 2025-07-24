const { BillSundryTransaction,TaxTransaction } = require("../../models");
const validateRequest = require("../validateRequest");
const commonQuery = require("../commonQuery");
const { ItemMaster } = require('../../models');

exports.getProductDetail = async (product_id, transaction = null) => {
  if (!product_id) return null;

  const product = await commonQuery.findOneById(ItemMaster, product_id, transaction);

  return product;
};