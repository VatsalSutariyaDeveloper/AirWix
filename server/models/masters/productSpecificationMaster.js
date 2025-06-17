module.exports = (sequelize, DataTypes) => {
  const ProductSpecificationMaster = sequelize.define("ProductSpecificationMaster", {
    master_field_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    master_field_db_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    field_type_id: { type: DataTypes.INTEGER, allowNull: false },
    priority: { type: DataTypes.INTEGER },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "product_specification_master",
    timestamps: true,
    underscored: true
  });

  return ProductSpecificationMaster;
};
