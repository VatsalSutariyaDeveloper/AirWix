module.exports = (sequelize, DataTypes) => {
  const ProductBomVersion = sequelize.define("ProductBomVersion", {
    series_id: { type: DataTypes.INTEGER },
    bom_version_no: { type: DataTypes.STRING(100) },
    product_id: { type: DataTypes.INTEGER },
    version_name: { type: DataTypes.STRING(150) },
    bom_type: { type: DataTypes.TINYINT, comment: "0 = Normal, 1 = Outside Jobwork" },
    is_default_bom: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0 = No, 1 = Yes" },
    bom_active_status: { type: DataTypes.TINYINT, defaultValue: 1, comment: "0 = Inactive, 1 = Active" },
    bom_version_date: { type: DataTypes.DATEONLY },
    unit: { type: DataTypes.STRING(50) },
    unit_quantity: { type: DataTypes.DECIMAL(15,5) },
    conversion_unit: { type: DataTypes.STRING(50) },
    conversion_quantity: { type: DataTypes.DECIMAL(15,5) },
    drawing_id: { type: DataTypes.INTEGER },
    revision_id: { type: DataTypes.INTEGER },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "product_bom_version",
    timestamps: true,
    underscored: true
  });

  return ProductBomVersion;
};
