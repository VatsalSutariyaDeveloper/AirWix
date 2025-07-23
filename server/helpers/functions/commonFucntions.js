const { BillSundryTransaction,TaxTransaction } = require("../../models/transactionModels");
const validateRequest = require("../validateRequest");
const commonQuery = require("../commonQuery");
const { ItemMaster } = require('../../models/masterModels');

exports.getProductDetail = async (product_id, transaction = null) => {
  if (!product_id) return null;

  const product = await commonQuery.findOneById(ItemMaster, product_id, transaction);

  return product;
};