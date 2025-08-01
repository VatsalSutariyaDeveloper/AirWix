module.exports = (sequelize, DataTypes) => {
  const BatchStockIn = sequelize.define(
    "BatchStockIn",
    {
      stock_general_trn_id: { type: DataTypes.INTEGER },
      batch_stock_no: { type: DataTypes.STRING(100) },
      godown_id: { type: DataTypes.INTEGER },
      product_unit: { type: DataTypes.INTEGER },
      product_qty: { type: DataTypes.DECIMAL(15,5) },
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
      tableName: "batch_stock_in",
      timestamps: true,
      underscored: true,
    }
  );

BatchStockIn.associate = (models) => {
  BatchStockIn.belongsTo(models.StockGeneralTransaction, {
    foreignKey: 'stock_general_trn_id',
    as: 'transaction'
  });
};

  return BatchStockIn;
};
