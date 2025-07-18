module.exports = (sequelize, DataTypes) => {
  const SalesOrderProductAssignBomVersion = sequelize.define("SalesOrderProductAssignBomVersion", {
    sales_order_transaction_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    bom_id: { type: DataTypes.INTEGER },
    bom_version_id: { type: DataTypes.INTEGER },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER },
  }, {
    tableName: "sales_order_product_assign_bom_version",
    timestamps: true,
    underscored: true
  });

  return SalesOrderProductAssignBomVersion;
};
