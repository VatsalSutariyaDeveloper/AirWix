module.exports = (sequelize, DataTypes) => {
  const QuotationTransactionRef = sequelize.define("QuotationTransactionRef", {
    approve_indent_id: { type: DataTypes.INTEGER, allowNull: false },
    supplier_details_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    unit_id: { type: DataTypes.INTEGER, allowNull: false },
    product_base_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    product_base_unit_id: { type: DataTypes.INTEGER, allowNull: true },
    product_convert_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    product_convert_unit_id: { type: DataTypes.INTEGER, allowNull: true },
    product_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    delivery_date: { type: DataTypes.DATEONLY, allowNull: true },
    payment_days: { type: DataTypes.INTEGER, allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
    ref_name: { type: DataTypes.STRING(100), allowNull: true },
    ref_id: { type: DataTypes.INTEGER, allowNull: true },
    quotation_comp: { type: DataTypes.TINYINT, allowNull: true },
    quotation_comp_user: { type: DataTypes.INTEGER, allowNull: true },
    quotation_comp_approval: { type: DataTypes.TINYINT, allowNull: true },
    quotation_comp_approval_user: { type: DataTypes.INTEGER, allowNull: true },
    vender_id: { type: DataTypes.INTEGER, allowNull: true },
    parent_request_id: { type: DataTypes.INTEGER, allowNull: true },
    quotation_no: { type: DataTypes.STRING(100), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = Active, 1 = Inactive, 2 = Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "quotation_transaction_ref",
    timestamps: true,
    underscored: true
  });

  return QuotationTransactionRef;
};
