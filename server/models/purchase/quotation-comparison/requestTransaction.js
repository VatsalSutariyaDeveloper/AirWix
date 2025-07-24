module.exports = (sequelize, DataTypes) => {
  const QuotationComparisonTrnReq = sequelize.define("QuotationComparisonTrnReq", {
    qc_request_id: { type: DataTypes.INTEGER, allowNull: true },
    approve_indent_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    unit_id: { type: DataTypes.INTEGER, allowNull: false },
    product_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_base_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    product_base_unit_id: { type: DataTypes.INTEGER, allowNull: true },
    product_convert_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    product_convert_unit_id: { type: DataTypes.INTEGER, allowNull: true },
    product_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    quotation_comp: { type: DataTypes.TINYINT, allowNull: true },
    quotation_comp_user: { type: DataTypes.INTEGER, allowNull: true },
    quotation_comp_approval: { type: DataTypes.TINYINT, allowNull: true },
    quotation_comp_approval_user: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = Active, 1 = Inactive, 2 = Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "quotation_comparison_transaction_req",
    timestamps: true,
    underscored: true
  });

  return QuotationComparisonTrnReq;
};
