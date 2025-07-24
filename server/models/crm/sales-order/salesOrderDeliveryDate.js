module.exports = (sequelize, DataTypes) => {
  const SalesOrderDeliveryDate = sequelize.define("SalesOrderDeliveryDate", {
    sales_order_transaction_id: { type: DataTypes.INTEGER },
    delivery_date: { type: DataTypes.DATEONLY },
    product_unit: { type: DataTypes.STRING(50) },
    product_qty: { type: DataTypes.DECIMAL(15,5) },
    used_qty: { type: DataTypes.DECIMAL(15,5) },
    invoice_status: { type: DataTypes.TINYINT }, // 0/1
    invoice_id: { type: DataTypes.INTEGER },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "sales_order_delivery_date",
    timestamps: true,
    underscored: true
  });

  return SalesOrderDeliveryDate;
};
