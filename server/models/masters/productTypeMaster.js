module.exports = (sequelize, DataTypes) => {
  const ProductTypeMaster = sequelize.define("ProductTypeMaster", {
    product_type_name: { type: DataTypes.STRING(100) },
    process_required: { type: DataTypes.TINYINT,defaultValue: 0, comment: "0 = No, 1 = Yes" },
    status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0 = Active, 1 = Inactive, 2 = Delete"},
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "product_type_master",
    timestamps: true,
    underscored: true
  });

  return ProductTypeMaster;
};
