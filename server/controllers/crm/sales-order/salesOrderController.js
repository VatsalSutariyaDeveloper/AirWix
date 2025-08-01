const { SalesOrder, SalesOrderTransaction,SalesOrderDeliveryDate } = require("../../../models");
const sequelize = require("../../../config/database");
const commonQuery = require("../../../helpers/commonQuery");
const { createBillSundries,createTaxTransactions, updateSeries  } = require("../../../helpers/functions/transaction_functions");
const validateRequest = require("../../../helpers/validateRequest");

const MODULE = "Sales Order";

// Create Sales Order + SalesOrderTransactions + BillSundries
exports.create = async (req, res) => {
  const requiredFields = {
    sales_order_no: "Sales Order No",
    sales_order_date: "Sales Order Date",
    customer_id: "Customer ID",
    grand_total: "Grand Total",
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });
  const { bill_sundries, sales_order_transactions,tax_transactions, ...salesOrderData } = req.body;

 //Check if required sections are present and non-empty
  const additionalErrors = [];

  if (!Array.isArray(sales_order_transactions) || sales_order_transactions.length === 0) {
    additionalErrors.push("Sales Order Transactions are required.");
  }

  if (!Array.isArray(tax_transactions) || tax_transactions.length === 0) {
    additionalErrors.push("Tax Transactions are required.");
  }

  if (!salesOrderData || Object.keys(salesOrderData).length === 0) {
    additionalErrors.push("Sales Order data is missing.");
  }

  if (additionalErrors.length) {
    return res.error("VALIDATION_ERROR", { errors: additionalErrors });
  }

  const transaction = await sequelize.transaction();
  try {

    // 1. Create Sales Order
    const salesOrder = await commonQuery.createRecord(SalesOrder, salesOrderData, transaction);
    let { delivery_type } = req.body;

    if (typeof delivery_type === "undefined") {
      const fullSalesOrder = await commonQuery.findOneById(SalesOrder, salesOrder.id, true, transaction);
      delivery_type = fullSalesOrder?.delivery_type;
    }

    // 2. Create Sales Order Transactions (+ delivery if needed)
    if (Array.isArray(sales_order_transactions) && sales_order_transactions.length) {
      for (const trn of sales_order_transactions) {
        const createdTrn = await commonQuery.createRecord(
          SalesOrderTransaction,
          { ...trn, sales_order_id: salesOrder.id },
          transaction
        );

        // 2a. If delivery_type is 1, insert delivery date record
        if (delivery_type === 1 && Array.isArray(trn.delivery_dates)) {
          for (const delivery of trn.delivery_dates) {
            const deliveryData = {
              ...delivery,
              sales_order_transaction_id: createdTrn.id,
              user_id: trn.user_id,
              branch_id: trn.branch_id,
              company_id: trn.company_id,
            };

            const deliveryErrors = await validateRequest(deliveryData, {
              sales_order_transaction_id: "Sales Order Transaction",
              delivery_date: "Delivery Date",
              product_unit: "Product Unit",
              product_qty: "Product Quantity",
              used_qty: "Used Quantity",
              user_id: "User",
              branch_id: "Branch",
              company_id: "Company",
            });

            if (deliveryErrors.length) {
              throw new Error(
                `Delivery Date Error (Product: ${trn.product_id}): ${deliveryErrors.join(", ")}`
              );
            }

            await commonQuery.createRecord(SalesOrderDeliveryDate, deliveryData, transaction);
          }
        }
      }
    }

    // 3. Create Bill Sundry Entries
    if (Array.isArray(bill_sundries) && bill_sundries.length) {
      await createBillSundries({
        sundries: bill_sundries,
        module_transaction_id: salesOrder.id,
        transaction,
      });
    }

    // 4. Create Tax Transactions
    if (Array.isArray(tax_transactions) && tax_transactions.length) {
      await createTaxTransactions({
        taxes: tax_transactions,
        module_transaction_id: salesOrder.id,
        transaction,
      });
    }

    await updateSeries(
      {
        series_id: req.body.series_type_id // Ensure this is in request
      },
      transaction
    );

    await transaction.commit();
    return res.success("CREATE", MODULE, salesOrder);
  } catch (err) {
    await transaction.rollback();
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Get All Sales Orders
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(SalesOrder, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Sales Order by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(SalesOrder, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Sales Order
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {}, {});
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(
      SalesOrder,
      { id: req.params.id },
      req.body
    );
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
// exports.update = async (req, res) => {
//   const salesOrderId = req.params.id;

//   const requiredFields = {
//     sales_order_no: "Sales Order No",
//     sales_order_date: "Sales Order Date",
//     customer_id: "Customer ID",
//     grand_total: "Grand Total",
//     company_id: "Company",
//     branch_id: "Branch",
//     user_id: "User",
//   };

//   const errors = await validateRequest(req.body, requiredFields);
//   if (errors.length) return res.error("VALIDATION_ERROR", { errors });

//   const { bill_sundries, sales_order_transactions, tax_transactions, ...salesOrderData } = req.body;

//   const additionalErrors = [];
//   if (!Array.isArray(sales_order_transactions) || sales_order_transactions.length === 0) {
//     additionalErrors.push("Sales Order Transactions are required.");
//   }
//   if (!Array.isArray(tax_transactions) || tax_transactions.length === 0) {
//     additionalErrors.push("Tax Transactions are required.");
//   }
//   if (!salesOrderData || Object.keys(salesOrderData).length === 0) {
//     additionalErrors.push("Sales Order data is missing.");
//   }

//   if (additionalErrors.length) {
//     return res.error("VALIDATION_ERROR", { errors: additionalErrors });
//   }

//   const transaction = await sequelize.transaction();
//   try {
//     const existingOrder = await commonQuery.findOneById(SalesOrder, salesOrderId, false, transaction);
//     if (!existingOrder) throw new Error("Sales Order not found.");

//     // 1. Update Sales Order
//     await existingOrder.update(salesOrderData, { transaction });

//     let { delivery_type } = req.body;
//     if (typeof delivery_type === "undefined") {
//       delivery_type = existingOrder.delivery_type;
//     }

//     // 2. Remove old transactions and delivery dates
//     await SalesOrderTransaction.destroy({ where: { sales_order_id: salesOrderId }, transaction });
//     await SalesOrderDeliveryDate.destroy({
//       where: {
//         sales_order_transaction_id: {
//           [sequelize.Op.in]: sequelize.literal(`(SELECT id FROM sales_order_transactions WHERE sales_order_id = ${salesOrderId})`)
//         }
//       },
//       transaction
//     });

//     // 3. Add new transactions + delivery dates
//     for (const trn of sales_order_transactions) {
//       const createdTrn = await commonQuery.createRecord(
//         SalesOrderTransaction,
//         { ...trn, sales_order_id: salesOrderId },
//         transaction
//       );

//       if (delivery_type === 1 && Array.isArray(trn.delivery_dates)) {
//         for (const delivery of trn.delivery_dates) {
//           const deliveryData = {
//             ...delivery,
//             sales_order_transaction_id: createdTrn.id,
//             user_id: trn.user_id,
//             branch_id: trn.branch_id,
//             company_id: trn.company_id,
//           };

//           const deliveryErrors = await validateRequest(deliveryData, {
//             sales_order_transaction_id: "Sales Order Transaction",
//             delivery_date: "Delivery Date",
//             product_unit: "Product Unit",
//             product_qty: "Product Quantity",
//             used_qty: "Used Quantity",
//             user_id: "User",
//             branch_id: "Branch",
//             company_id: "Company",
//           });

//           if (deliveryErrors.length) {
//             throw new Error(`Delivery Date Error (Product: ${trn.product_id}): ${deliveryErrors.join(", ")}`);
//           }

//           await commonQuery.createRecord(SalesOrderDeliveryDate, deliveryData, transaction);
//         }
//       }
//     }

//     // 4. Remove and recreate bill sundries
//     await createBillSundries({
//       sundries: bill_sundries || [],
//       module_transaction_id: salesOrderId,
//       transaction,
//       overwrite: true
//     });

//     // 5. Remove and recreate tax transactions
//     await createTaxTransactions({
//       taxes: tax_transactions || [],
//       module_transaction_id: salesOrderId,
//       transaction,
//       overwrite: true
//     });

//     // 6. Update series
//     await updateSeries({ series_id: req.body.series_type_id }, transaction);

//     await transaction.commit();
//     return res.success("UPDATE", MODULE, existingOrder);
//   } catch (err) {
//     await transaction.rollback();
//     return res.error("SERVER_ERROR", { error: err.message });
//   }
// };

// Delete Sales Order
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(SalesOrder, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
