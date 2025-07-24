const dayjs = require('dayjs');
const commonQuery = require('../commonQuery');
const { ItemMaster } = require('../../models/masterModels');
const { getProductDetail } = require('./commonFucntions');

exports.getExpDateByProduct = async (product_id, mfgDate) => {
  try {
    const product = await commonQuery.findOneById( ItemMaster, product_id );

    if (product && product.self_life_days) {
      const expDate = dayjs(mfgDate).add(product.self_life_days, 'day').format('DD-MM-YYYY');
      return expDate;
    } else {
      return '';
    }
  } catch (err) {
    console.error("Error in getExpDateByProduct:", err);
    return '';
  }
};

exports.convertStock = async (stock, productId, type) => {
  try {
    const product = await getProductDetail(productId);

    if (!product) return 0;

    const {
      product_base_unit,
      product_conv_unit,
      product_base_qty,
      product_conv_qty
    } = product;

    if (product_base_unit !== product_conv_unit) {
      if (type === 'base_unit') {
        return (stock / product_conv_qty) * product_base_qty;
      } else {
        return (stock / product_base_qty) * product_conv_qty;
      }
    } else {
      return stock;
    }
  } catch (err) {
    console.error("Error in convertStockNew:", err);
    return 0;
  }
};