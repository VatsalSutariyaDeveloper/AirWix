module.exports = (sequelize, DataTypes) => {
  const ProductSpecificationValueMaster = sequelize.define("ProductSpecificationValueMaster", {
    master_field_name_id: { type: DataTypes.INTEGER, allowNull: false },
    master_field_value: { type: DataTypes.STRING(100), allowNull: false },
    priority: { type: DataTypes.INTEGER },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "product_specification_value_master",
    timestamps: true,
    underscored: true
  });

  return ProductSpecificationValueMaster;
};
