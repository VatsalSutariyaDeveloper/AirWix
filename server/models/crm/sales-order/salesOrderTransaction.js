module.exports = (sequelize, DataTypes) => {
  const SalesOrderTransaction = sequelize.define(
    "SalesOrderTransaction",
    {
      sales_order_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      product_description: { type: DataTypes.TEXT },
      product_specification: { type: DataTypes.TEXT },
      product_unit: { type: DataTypes.INTEGER },
      product_qty: { type: DataTypes.DECIMAL(15, 5) },
      product_base_unit: { type: DataTypes.INTEGER },
      product_base_qty: { type: DataTypes.DECIMAL(15, 5) },
      product_convert_unit: { type: DataTypes.INTEGER },
      product_convert_qty: { type: DataTypes.DECIMAL(15, 5) },
      product_amount: { type: DataTypes.DECIMAL(15, 5) },
      product_convert_amount: { type: DataTypes.DECIMAL(15, 5) },
      discount_per: { type: DataTypes.DECIMAL(15, 5) },
      discount_amount: { type: DataTypes.DECIMAL(15, 5) },
      discount_convert_amount: { type: DataTypes.DECIMAL(15, 5) },
      tax_1_name: { type: DataTypes.STRING(50) },
      tax_1_amount: { type: DataTypes.DECIMAL(15, 5) },
      tax_2_name: { type: DataTypes.STRING(50) },
      tax_2_amount: { type: DataTypes.DECIMAL(15, 5) },
      tax_3_name: { type: DataTypes.STRING(50) },
      tax_3_amount: { type: DataTypes.DECIMAL(15, 5) },
      quotation_transaction_id: { type: DataTypes.INTEGER },
      production_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      production_qty: { type: DataTypes.DECIMAL(15, 5) },
      production_branch_id: { type: DataTypes.INTEGER },
      bom_id: { type: DataTypes.INTEGER },
      delivery_type: { type: DataTypes.TINYINT },
      delivery_date: { type: DataTypes.DATE },
      bom_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      with_out_stock_invoice: { type: DataTypes.TINYINT },
      invoice_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      invoice_id: { type: DataTypes.INTEGER },
      remaning_invoice_qty: { type: DataTypes.DECIMAL(15, 5) },
      remaning_invoice_convert_qty: { type: DataTypes.DECIMAL(15, 5) },
      dispatch_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      dispatch_id: { type: DataTypes.INTEGER },
      allocate_qty: { type: DataTypes.DECIMAL(15, 5) },
      allocate_convert_qty: { type: DataTypes.DECIMAL(15, 5) },
      remaning_dispatch_qty: { type: DataTypes.DECIMAL(15, 5) },
      remaning_dispatch_convert_qty: { type: DataTypes.DECIMAL(15, 5) },
      is_allocated: { type: DataTypes.TINYINT },
      product_tax_category_id: { type: DataTypes.INTEGER },
      cgst_percentage: { type: DataTypes.DECIMAL(15, 5) },
      cgst_rate: { type: DataTypes.DECIMAL(15, 5) },
      cgst_rate_convert: { type: DataTypes.DECIMAL(15, 5) },
      sgst_percentage: { type: DataTypes.DECIMAL(15, 5) },
      sgst_rate: { type: DataTypes.DECIMAL(15, 5) },
      sgst_rate_convert: { type: DataTypes.DECIMAL(15, 5) },
      igst_percentage: { type: DataTypes.DECIMAL(15, 5) },
      igst_rate: { type: DataTypes.DECIMAL(15, 5) },
      igst_rate_convert: { type: DataTypes.DECIMAL(15, 5) },
      returnable_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      prev_sales_order_id: { type: DataTypes.INTEGER },
      short_close_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      short_close_unit_id: { type: DataTypes.INTEGER },
      short_close_qty: { type: DataTypes.DECIMAL(15, 5) },
      total_amount: { type: DataTypes.DECIMAL(15, 5) },
      total_convert_amount: { type: DataTypes.DECIMAL(15, 5) },
      priority: { type: DataTypes.STRING(10) },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      branch_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: "0:Active, 1:Inactive, 2:Deleted",
      },
    },
    {
      tableName: "sales_order_transaction",
      timestamps: true,
      underscored: true,
    }
  );

  SalesOrderTransaction.associate = (models) => {
    // SalesOrder association
    SalesOrderTransaction.belongsTo(models.SalesOrder, {
      foreignKey: "sales_order_id",
      as: "salesOrder",
    });

    // Product (ItemMaster) association
    SalesOrderTransaction.belongsTo(models.ItemMaster, {
      foreignKey: "product_id",
      as: "product",
    });

    // Branch association
    SalesOrderTransaction.belongsTo(models.BranchMaster, {
      foreignKey: "branch_id",
      as: "branch",
    });

    // ProductionTrn association (example: hasMany to SalesOrderProductionTransaction)
    SalesOrderTransaction.hasMany(models.SalesOrderProductionTransaction, {
      foreignKey: "sales_order_transaction_id",
      as: "productionTrn",
    });

    // ProductUnitMaster associations
    SalesOrderTransaction.belongsTo(models.ProductUnitMaster, {
      foreignKey: "product_unit",
      as: "unit",
    });

    // Associations for base and convert units
    SalesOrderTransaction.belongsTo(models.ProductUnitMaster, {
      foreignKey: "product_base_unit",
      as: "base_unit",
    });

    // Association for convert unit
    SalesOrderTransaction.belongsTo(models.ProductUnitMaster, {
      foreignKey: "product_convert_unit",
      as: "convert_unit",
    });
  };

  return SalesOrderTransaction;
};
