module.exports = (sequelize, DataTypes) => {
  const StockTransaction = sequelize.define(
    "StockTransaction",
    {
      product_id: { type: DataTypes.INTEGER },
      product_base_unit: { type: DataTypes.INTEGER },
      product_base_qty: { type: DataTypes.DECIMAL(15,5) },
      used_base_qty: {
        type: DataTypes.DECIMAL(15,5),
        defaultValue: 0.0,
      },
      product_convert_unit: { type: DataTypes.INTEGER },
      product_convert_qty: { type: DataTypes.DECIMAL(15,5) },
      used_convert_qty: {
        type: DataTypes.DECIMAL(15,5),
        defaultValue: 0.0,
      },
      product_amount: { type: DataTypes.DECIMAL(15,5) },
      product_convert_amount: { type: DataTypes.DECIMAL(15,5) },
      stock_flag: { type: DataTypes.INTEGER },
      godown_id: { type: DataTypes.INTEGER },
      ref_name: { type: DataTypes.STRING(100) },
      ref_id: { type: DataTypes.INTEGER },
      perent_id: { type: DataTypes.INTEGER },
      reserve_id: { type: DataTypes.INTEGER },
      customer_id: { type: DataTypes.INTEGER },
      batch_id: { type: DataTypes.INTEGER },
      batch_no: { type: DataTypes.STRING(100) },
      mfg_date: { type: DataTypes.DATE },
      exp_date: { type: DataTypes.DATE },
      workorder_id: { type: DataTypes.INTEGER },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: "0: Active, 1: Inactive, 2: Deleted",
      },
      user_id: { type: DataTypes.INTEGER },
      branch_id: { type: DataTypes.INTEGER },
      company_id: { type: DataTypes.INTEGER },
    },
    {
      tableName: "stock_transaction",
      timestamps: true,
      underscored: true,
    }
  );

  return StockTransaction;
};
