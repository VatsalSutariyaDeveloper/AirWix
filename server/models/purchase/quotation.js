module.exports = (sequelize, DataTypes) => {
  const PurchaseQuotation = sequelize.define("PurchaseQuotation", {
    approve_indent_id: { type: DataTypes.INTEGER },
    purchase_quotation_transaction_id: { type: DataTypes.INTEGER },
    vendor_id: { type: DataTypes.INTEGER },
    purchase_quotation_series: { type: DataTypes.STRING(100) },
    purchase_quotation_no: { type: DataTypes.STRING(100) },
    purchase_quotation_date: { type: DataTypes.DATE },
    delivery_date: { type: DataTypes.DATE },
    payment_day: { type: DataTypes.INTEGER },
    product_rate: { type: DataTypes.DECIMAL(15,5) },
    purchase_quotation_status: { type: DataTypes.TINYINT },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER },
  }, {
    tableName: "purchase_quotation",
    timestamps: true,
    underscored: true
  });

  return PurchaseQuotation;
};
