module.exports = (sequelize, DataTypes) => {
  const QuotationComparisonRequest = sequelize.define("QuotationComparisonRequest", {
    req_quotation_no: { type: DataTypes.STRING(100), allowNull: false },
    req_quotation_date: { type: DataTypes.DATEONLY, allowNull: false },
    vendor_id: { type: DataTypes.TEXT, allowNull: false },
    comparison: { type: DataTypes.TINYINT, defaultValue: 0 },
    comparision_user: { type: DataTypes.INTEGER, allowNull: true },
    approval_status: { type: DataTypes.TINYINT, defaultValue: 0 },
    approval_user: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "quotation_comparison_request",
    timestamps: true,
    underscored: true
  });

  return QuotationComparisonRequest;
};
