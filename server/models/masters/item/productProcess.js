module.exports = (sequelize, DataTypes) => {
  const ProductProcess = sequelize.define("ProductProcess", {
    product_id: { type: DataTypes.INTEGER },
    process_id: { type: DataTypes.INTEGER },
    resource_id: { type: DataTypes.INTEGER },
    resource_table_reference: { type: DataTypes.STRING(100) },
    process_rate: { type: DataTypes.DECIMAL(10, 2) },
    process_priority: { type: DataTypes.INTEGER },
    process_time: { type: DataTypes.STRING(50) },
    process_type: { type: DataTypes.TINYINT, comment: "1 = Inhouse, 2 = Outside" },
    process_opening: { type: DataTypes.DECIMAL(10, 2) },
    process_loss: { type: DataTypes.DECIMAL(10, 2) },
    process_scrap_tolerance_plus: { type: DataTypes.DECIMAL(10, 2) },
    process_scrap_tolerance_minus: { type: DataTypes.DECIMAL(10, 2) },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "product_process",
    timestamps: true,
    underscored: true
  });

  return ProductProcess;
};
