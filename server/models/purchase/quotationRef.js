module.exports = (sequelize, DataTypes) => {
  const PurchaseQuotationRef = sequelize.define("PurchaseQuotationRef", {
    ref_quotation_no: { type: DataTypes.STRING(100), allowNull: false },
    ref_quotation_date: { type: DataTypes.DATEONLY, allowNull: false },
    vender_id: { type: DataTypes.INTEGER, allowNull: false },
    comparision_status: { type: DataTypes.TINYINT, defaultValue: 0 },
    comparision_user: { type: DataTypes.INTEGER, allowNull: true },
    ref_quotation_status: { type: DataTypes.TINYINT, defaultValue: 0 },
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
    tableName: "purchase_quotation_ref",
    timestamps: true,
    underscored: true
  });

  return PurchaseQuotationRef;
};
