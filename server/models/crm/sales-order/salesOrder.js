module.exports = (sequelize, DataTypes) => {
  const SalesOrder = sequelize.define("SalesOrder", {
    order_type: { type: DataTypes.INTEGER, comment: "0:Direct, 1:Multiple Quotation" }, // 0:Direct, 1:Multiple Quotation
    sales_order_type: { type: DataTypes.INTEGER , comment: "0:Domestic, 1:Export"}, // 0:Domestic, 1:Export
    sales_order_series_type_id: { type: DataTypes.INTEGER },
    sales_order_no: { type: DataTypes.STRING(100), allowNull: false },
    sales_order_date: { type: DataTypes.DATEONLY },
    inquiry_type: { type: DataTypes.INTEGER },
    ref_no: { type: DataTypes.STRING(100) },
    customer_id: { type: DataTypes.INTEGER },
    consignee_id: { type: DataTypes.INTEGER },
    is_quotation: { type: DataTypes.BOOLEAN },
    quotation_id: { type: DataTypes.INTEGER },
    tax_1_name: { type: DataTypes.STRING(100) },
    tax_1_amount: { type: DataTypes.DECIMAL(10, 2) },
    tax_2_name: { type: DataTypes.STRING(100) },
    tax_2_amount: { type: DataTypes.DECIMAL(10, 2) },
    tax_3_name: { type: DataTypes.STRING(100) },
    tax_3_amount: { type: DataTypes.DECIMAL(10, 2) },
    discount_per: { type: DataTypes.DECIMAL(5, 2) },
    discount_amount: { type: DataTypes.DECIMAL(10, 2) },
    discount_convert_amount: { type: DataTypes.DECIMAL(10, 2) },
    grand_total: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    grand_total_convert: { type: DataTypes.DECIMAL(12, 2) },
    without_stock_invoice: { type: DataTypes.BOOLEAN },
    remark: { type: DataTypes.TEXT },
    special_notes: { type: DataTypes.TEXT },
    quotation_condition: { type: DataTypes.TEXT },
    invoice_status: { type: DataTypes.STRING(50) },
    invoice_id: { type: DataTypes.INTEGER },
    delivery_type: { type: DataTypes.TINYINT,defaultValue: 0, comment: "0 = SO Wise, 1 = Product Wise" },
    delivery_date: { type: DataTypes.DATEONLY },
    po_no: { type: DataTypes.STRING(100) },
    po_date: { type: DataTypes.DATEONLY },
    so_terms_and_condition: { type: DataTypes.TEXT },
    order_by: { type: DataTypes.STRING(50) },
    enable_transport: { type: DataTypes.TINYINT },
    transport_id: { type: DataTypes.INTEGER },
    transport_address: { type: DataTypes.STRING(255) },
    coordinator_id: { type: DataTypes.INTEGER },
    payment_terms_id: { type: DataTypes.INTEGER },
    billing_type: { type: DataTypes.TINYINT },
    sales_type: { type: DataTypes.STRING(50) },
    currency_enable: { type: DataTypes.BOOLEAN },
    currency_id: { type: DataTypes.INTEGER },
    currency_rate: { type: DataTypes.DECIMAL(10, 4) },
    jobwork_type: { type: DataTypes.TINYINT },
    revise_status: { type: DataTypes.TINYINT },
    start_sales_order_id: { type: DataTypes.INTEGER },
    prev_sales_order_id: { type: DataTypes.INTEGER },
    sales_order_short_close_status: { type: DataTypes.TINYINT },
    gst_type_id: { type: DataTypes.INTEGER },
    kind_attantion: { type: DataTypes.STRING(100) },
    terms_type: { type: DataTypes.TINYINT },
    terms_quotation_id: { type: DataTypes.INTEGER },
    ship_address: { type: DataTypes.TEXT },
    priority: { type: DataTypes.STRING(20) },
    approval_status: { type: DataTypes.STRING(50) },
    order_acceptance_status: { type: DataTypes.STRING(50) },
    sales_order_status: { type: DataTypes.STRING(50) },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = active, 1 = inactive, 2 = deleted"
    }
});

  SalesOrder.associate = (models) => {
    SalesOrder.hasMany(models.SalesOrderTransaction, {
      foreignKey: "sales_order_id",
      as: "transactions",
    });

    // Ledger association
    SalesOrder.belongsTo(models.LedgerMaster, {
      foreignKey: "customer_id",
      as: "ledger",
    });
  };

  return SalesOrder;
};
