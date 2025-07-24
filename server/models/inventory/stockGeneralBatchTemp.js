// models/tbl_general_batch_stock_tmp.js

module.exports = (sequelize, DataTypes) => {
  const StockGeneralBatchTemp = sequelize.define('StockGeneralBatchTemp', {
    stock_general_trn_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    godown_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reserve_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_qty: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    prduct_unit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: "0: Active, 1: Inactive, 2: Deleted",
      },
      user_id: { type: DataTypes.INTEGER },
      branch_id: { type: DataTypes.INTEGER },
      company_id: { type: DataTypes.INTEGER },
  }, {
    tableName: 'sock_general_batch_temp',
    timestamps: false
  });

  return StockGeneralBatchTemp;
};
