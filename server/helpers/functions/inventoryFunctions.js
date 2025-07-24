const {
  ReserveStock,
  StockGeneralTransaction,
  BatchStockIn,
  StockTransaction,
  BatchData,
} = require("../../models");
const { ItemMaster } = require("../../models");
const commonQuery = require("../commonQuery");
const moment = require("moment");
const { convertStock, getExpDateByProduct } = require("./helperFunction");
const { getProductDetail } = require("./commonFucntions");
// const { session } = require("../middleware/authMiddleware");

exports.addStock = async ({
  transaction = null,
  product_id,
  product_unit,
  ref_name,
  ref_id,
  godown_id,
  product_qty,
  stock_flag,
  branch_id,
  perent_id,
  reserve_id,
  customer_id = "",
  batch_id = "",
  batch_no = "",
  base_rate = "",
  conv_rate = "",
  workorder_id = 0,
}) => {
  let infoGen = {};
  let resStock = null;

  if (perent_id) {
    resStock = await commonQuery.findAllRecords(
      StockTransaction,
      { id: perent_id },
      transaction
    );

    if (resStock && resStock.length) {
      resStock = resStock[0];
      if (!customer_id) customer_id = resStock.customer_id;
      if (!batch_id) batch_id = resStock.batch_id;
      if (!batch_no) batch_no = resStock.batch_no;
    }
  }

  if (stock_flag === 1) {
    if (batch_id) {
      const batch = await commonQuery.findOneById(BatchData, batch_id, transaction);
      if (batch) {
        infoGen.mfg_date = batch.mfg_date;
        infoGen.exp_date = batch.exp_date;
      }
    } else {
      infoGen.mfg_date = moment().format("YYYY-MM-DD");
      const dt = await getExpDateByProduct(
        product_id,
        moment().format("DD-MM-YYYY")
      );
      infoGen.exp_date = moment(dt, "DD-MM-YYYY").format("YYYY-MM-DD");
    }
  }
  
  const product = await getProductDetail(product_id, transaction);
  let base_stock = product_qty;
  let con_stock = product_qty;
  if (product.purchase_unit !== product.production_unit) {
    if (batch_id) {
      const batch = await commonQuery.findOneById(BatchData, batch_id, transaction);
      if (product.purchase_unit === product_unit) {
        con_stock = product_qty;
        base_stock = (con_stock / batch.conv_qty) * batch.base_qty;
      } else {
        base_stock = product_qty;
        con_stock = (base_stock / batch.base_qty) * batch.conv_qty;
      }
    } else {
      if (product.purchase_unit === product_unit) {
        con_stock = product_qty;
        base_stock = await convertStock(product_qty, product_id, "base_unit");
      } else {
        base_stock = product_qty;
        con_stock = await convertStock(product_qty, product_id, "conv_unit");
      }
    }
  }

  infoGen = {
    ...infoGen,
    product_id,
    product_base_unit: product.production_unit,
    product_base_qty: base_stock,
    product_convert_unit: product.purchase_unit,
    product_convert_qty: con_stock,
    stock_flag: stock_flag,
    godown_id,
    ref_name,
    ref_id,
    perent_id,
    reserve_id,
    customer_id,
    batch_id,
    batch_no,
    base_rate,
    conv_rate,
    workorder_id,
    // user_id: session.user_id,
    // company_id: session.company_id,
    user_id: 1,
    company_id: 1,
    branch_id: branch_id || 1,
  };

  if (stock_flag === 2 && resStock) {
    infoGen.base_rate = resStock.base_rate;
    infoGen.conv_rate = resStock.conv_rate;
  }
  const inserted = await commonQuery.createRecord(
    StockTransaction,
    infoGen,
    transaction
  );

  return inserted;
};

exports.enterProductionStockEffect = async (
  stock_general_id,
  user_id,
  company_id,
  branch_id,
  transaction = null
) => {
  const transactions = await commonQuery.findAllRecords(
    StockGeneralTransaction,
    { stock_general_id, stock_flag: 2, status: 0 },
    transaction
  );

  for (const trn of transactions) {
    const reserveStocks = await commonQuery.findAllRecords(
      ReserveStock,
      {
        ref_name: "Stock General",
        ref_id: trn.id,
        stock_flag: 1,
      },
      transaction
    );

    for (const stock of reserveStocks) {
      const reserveData = {
        product_id: stock.product_id,
        product_base_unit: stock.product_base_unit,
        product_base_qty: stock.product_base_qty,
        product_convert_unit: stock.product_convert_unit,
        product_convert_qty: stock.product_convert_qty,
        stock_flag: 2,
        ref_name: stock.ref_name,
        ref_id: stock.ref_id,
        stock_id: stock.stock_id,
        godown_id: stock.godown_id,
        branch_id: stock.branch_id,
        user_id,
        company_id,
      };

      await commonQuery.createRecord(ReserveStock, reserveData, transaction);

      await exports.addStock({
        transaction,
        product_id: stock.product_id,
        product_unit: stock.base_unit,
        ref_name: stock.ref_name,
        ref_id: stock.ref_id,
        reserve_id: stock.id,
        godown_id: stock.godown_id,
        product_qty: stock.product_base_qty,
        stock_flag: 2,
        branch_id,
        perent_id: stock.stock_id,
      });
    }
  }

  const batches = await commonQuery.findAllRecords(
    BatchStockIn,
    { status: 0 },
    false,
    {
      include: [
        {
          model: StockGeneralTransaction,
          as: "transaction",
          where: {
            stock_general_id,
            status: 0,
          },
        },
      ],
    },
    transaction
  );

  for (const batch of batches) {
    await exports.addStock({
      transaction,
      product_id: batch.transaction.product_id,
      product_unit: batch.product_unit,
      ref_name: "Stock General",
      ref_id: batch.stock_general_trn_id,
      godown_id: batch.godown_id,
      product_qty: batch.product_qty,
      stock_flag: 1,
      branch_id,
      batch_id: batch.batch_id,
      batch_no: batch.batch_stock_no,
      base_rate: batch.transaction.product_rate,
      conv_rate: batch.transaction.product_conv_rate,
    });
  }
};

exports.deleteProductStockEffect = async (
  stock_general_id,
  transaction = null
) => {
  const transactions = await commonQuery.findAllRecords(
    StockGeneralTransaction,
    { stock_general_id, stock_flag: 2 },
    transaction
  );

  for (const trn of transactions) {
    const reserveStocks = await commonQuery.findAllRecords(
      ReserveStock,
      {
        ref_name: "Stock General",
        ref_id: trn.id,
      },
      transaction
    );

    for (const stock of reserveStocks) {
      const stockTrn = await commonQuery.findOneById(
        StockTransaction,
        {id: stock.stock_id},
        transaction
      );

      if (stockTrn) {
        await commonQuery.updateRecordById(
          StockTransaction,
          { id: stockTrn.id },
          {
            used_base_qty: stockTrn.used_base_qty - stock.product_base_qty,
            used_convert_qty: stockTrn.used_convert_qty - stock.product_convert_qty,
          },
          transaction,
          true
        );
      }
      
      await commonQuery.updateRecordById(
        ReserveStock,
        { id: stock.id },
        { status: 2 },
        transaction,
        true
      );
    }

    // await ReserveStock.update(
    //   { status: 2 },
    //   {
    //     where: {
    //       ref_name: "Stock General",
    //       ref_id: trn.id,
    //     },
    //     transaction,
    //   }
    // );
  }
};

exports.itemReserveStockEntry = async (
  transaction,
  product_id,
  base_unit,
  conv_unit,
  base_stock,
  con_stock,
  chalan_type,
  returnable_trn_id,
  stock_id,
  godown_id,
  branch_id,
  user_id,
  company_id
) => {
  try {
    // 1. Check existing reserve stock
    const existingStockArr = await commonQuery.findAllRecords(
      ReserveStock,
      {
        status: 0,
        stock_flag: 1,
        ref_name: chalan_type,
        ref_id: returnable_trn_id,
        product_id,
        stock_id,
      },
      transaction
    );

    const info_stock = {
      product_id,
      product_base_unit: base_unit,
      product_base_qty: base_stock,
      product_convert_unit: conv_unit,
      product_convert_qty: con_stock,
      stock_flag: 1,
      ref_name: chalan_type,
      ref_id: returnable_trn_id,
      stock_id,
      godown_id,
      user_id,
      company_id,
      branch_id,
    };

    let prev_stock = 0;
    let prev_conv_stock = 0;

    const existingStock = existingStockArr[0];

    if (existingStock) {
      prev_stock = existingStock.base_stock;
      prev_conv_stock = existingStock.convert_stock;

      await commonQuery.updateRecordById(
        ReserveStock,
        { id: existingStock.id },
        info_stock,
        transaction,
        true
      );
    } else {
      await commonQuery.createRecord(ReserveStock, info_stock, transaction);
    }

    // 2. Fetch the original stock transaction
    const stockTrn = await commonQuery.findOneById(
      StockTransaction,
      stock_id,
      false,
      transaction,
      true
    );

    const used_base_stock =
      parseFloat(stockTrn.used_base_qty) + parseFloat(base_stock);
    const used_convert_stock =
      parseFloat(stockTrn.used_convert_qty) + parseFloat(con_stock);

    const updatedTrn = {
      used_base_qty: used_base_stock - prev_stock,
      used_convert_qty: used_convert_stock - prev_conv_stock,
    };

    await commonQuery.updateRecordById(
      StockTransaction,
      { id: stockTrn.id },
      updatedTrn,
      transaction,
      true
    );

    return true;
  } catch (err) {
    throw err;
  }
};
