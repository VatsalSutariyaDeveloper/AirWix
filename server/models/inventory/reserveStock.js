module.exports = (sequelize, DataTypes) => {
  const ReserveStock = sequelize.define("ReserveStock", {
    product_id: { type: DataTypes.INTEGER },
    product_base_unit: { type: DataTypes.INTEGER },
    product_base_qty: { type: DataTypes.DECIMAL(10,2) },
    used_base_qty: { type: DataTypes.DECIMAL(10,2) },
    approve_base_qty: { type: DataTypes.DECIMAL(10,2) },
    product_convert_unit: { type: DataTypes.INTEGER },
    product_convert_qty: { type: DataTypes.DECIMAL(10,2) },
    used_convert_qty: { type: DataTypes.DECIMAL(10,2) },
    approve_convert_qty: { type: DataTypes.DECIMAL(10,2) },
    product_amount: { type: DataTypes.DECIMAL(12,2) },
    product_convert_amount: { type: DataTypes.DECIMAL(12,2) },
    stock_flage: { type: DataTypes.INTEGER },
    godown_id: { type: DataTypes.INTEGER },
    ref_name: { type: DataTypes.STRING(100) },
    ref_id: { type: DataTypes.INTEGER },
    stock_id: { type: DataTypes.INTEGER },
    p_id: { type: DataTypes.INTEGER },
    perent_id: { type: DataTypes.INTEGER },
    reserve_id: { type: DataTypes.INTEGER },
    customer_id: { type: DataTypes.INTEGER },
    batch_id: { type: DataTypes.INTEGER },
    batch_no: { type: DataTypes.STRING(100) },
    used_status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Not Used, 1: Used"
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER },
  }, {
    tableName: "reserve_stock",
    timestamps: true,
    underscored: true
  });

  return ReserveStock;
};
