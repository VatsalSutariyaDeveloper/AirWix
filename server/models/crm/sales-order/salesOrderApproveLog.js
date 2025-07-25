module.exports = (sequelize, DataTypes) => {
  const SalesOrderApproveLog = sequelize.define("SalesOrderApproveLog", {
    sales_order_id: { type: DataTypes.INTEGER },
    assign_user_id: { type: DataTypes.INTEGER },
    approval_status: { type: DataTypes.STRING(50) },
    approval_remark: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "sales_order_approve_log",
    timestamps: true,
    underscored: true
  });

  return SalesOrderApproveLog;
};
