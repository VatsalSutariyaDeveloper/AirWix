module.exports = (sequelize, DataTypes) => {
  const StockGeneralApprovalLog = sequelize.define("StockGeneralApprovalLog", {
    stock_general_id: { type: DataTypes.INTEGER },
    remark: { type: DataTypes.TEXT },
    approval_status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Pending, 1: Approved"
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER },
  }, {
    tableName: "stock_general_approval_log",
    timestamps: true,
    underscored: true
  });

  return StockGeneralApprovalLog;
};
