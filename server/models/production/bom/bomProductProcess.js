module.exports = (sequelize, DataTypes) => {
  const BOMProductProcess = sequelize.define("BOMProductProcess", {
    bom_id: { type: DataTypes.INTEGER },
    bom_version_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    priority: { type: DataTypes.INTEGER },
    bom_product_process: { type: DataTypes.STRING(150) },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "bom_product_process",
    timestamps: true,
    underscored: true
  });

  return BOMProductProcess;
};
