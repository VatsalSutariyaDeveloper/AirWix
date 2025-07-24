module.exports = (sequelize, DataTypes) => {
  const WorkOrderReservTemp = sequelize.define("WorkOrderReservTemp", {
    sales_order_transaction_id: { type: DataTypes.INTEGER },
    work_order_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    product_unit: { type: DataTypes.STRING(50) },
    product_qty: { type: DataTypes.DECIMAL(15,5) },
    gowdown_id: { type: DataTypes.INTEGER },
    stock_id: { type: DataTypes.INTEGER },
    batch_no: { type: DataTypes.STRING(100) },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "work_order_reserv_temp",
    timestamps: true,
    underscored: true
  });

  return WorkOrderReservTemp;
};
