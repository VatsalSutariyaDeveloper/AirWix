module.exports = (sequelize, DataTypes) => {
  const BOM = sequelize.define("BOM", {
    bom_version_id: { type: DataTypes.INTEGER },
    bom_no: { type: DataTypes.STRING(100) },
    bom_date: { type: DataTypes.DATEONLY },
    bom_product_id: { type: DataTypes.INTEGER },
    bom_type: { type: DataTypes.TINYINT, comment: "0 = Normal, 1 = Outside Jobwork" },
    bom_quantity: { type: DataTypes.DECIMAL(15,5) },
    product_base_unit: { type: DataTypes.STRING(50) },
    product_base_quantity: { type: DataTypes.DECIMAL(15,5) },
    product_conversion_unit: { type: DataTypes.STRING(50) },
    product_conversion_quantity: { type: DataTypes.DECIMAL(15,5) },
    remark: { type: DataTypes.TEXT },
    total_standard_quantity: { type: DataTypes.DECIMAL(15,5) },
    conversion_factor: { type: DataTypes.DECIMAL(15,5) },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "bom",
    timestamps: true,
    underscored: true
  });

  return BOM;
};
