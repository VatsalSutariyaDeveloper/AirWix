module.exports = (sequelize, DataTypes) => {
  const SalesOrderProductionTransaction = sequelize.define("SalesOrderProductionTransaction", {
    sales_order_transaction_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    product_unit: { type: DataTypes.STRING(50) },
    product_qty: { type: DataTypes.DECIMAL(10, 2) },
    request_id: { type: DataTypes.INTEGER },
    gowdown_id: { type: DataTypes.INTEGER },
    stock_id: { type: DataTypes.INTEGER },
    allocate_qty: { type: DataTypes.DECIMAL(10, 2) },
    batch_no: { type: DataTypes.STRING(100) },
    invoice_status: { type: DataTypes.STRING(50), allowNull: true },
    invoice_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    invoice_remaining_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "sales_order_production_transaction",
    timestamps: true,
    underscored: true
  });

  return SalesOrderProductionTransaction;
};
