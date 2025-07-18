module.exports = (sequelize, DataTypes) => {
  const ReserveStock = sequelize.define("ReserveStock", {
    stock_general_id: { type: DataTypes.INTEGER },
    sales_order_id: { type: DataTypes.INTEGER },
    for_user_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    product_unit: { type: DataTypes.INTEGER },
    product_qty: { type: DataTypes.DECIMAL(10,2) },
    product_base_unit: { type: DataTypes.INTEGER },
    product_base_qty: { type: DataTypes.DECIMAL(10,2) },
    product_convert_unit: { type: DataTypes.INTEGER },
    product_convert_qty: { type: DataTypes.DECIMAL(10,2) },
    product_amount: { type: DataTypes.DECIMAL(12,2) },
    product_convert_amount: { type: DataTypes.DECIMAL(12,2) },
    stock_flage: { type: DataTypes.INTEGER },
    godown_id: { type: DataTypes.INTEGER },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER },
  }, {
    tableName: "stock_general_trasaction",
    timestamps: true,
    underscored: true
  });

  return ReserveStock;
};
