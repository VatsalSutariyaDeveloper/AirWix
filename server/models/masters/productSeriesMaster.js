module.exports = (sequelize, DataTypes) => {
  const ProductSeriesMaster = sequelize.define("ProductSeriesMaster", {
    product_type_id: { type: DataTypes.INTEGER },
    product_code: { type: DataTypes.STRING(100) },
    product_series: { type: DataTypes.INTEGER,defaultValue: 0 },
    status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0 = Active, 1 = Inactive, 2 = Delete"},
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "product_series_master",
    timestamps: true,
    underscored: true
  });

  return ProductSeriesMaster;
};
