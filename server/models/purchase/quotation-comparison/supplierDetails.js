module.exports = (sequelize, DataTypes) => {
  const SupplierDetails = sequelize.define("SupplierDetails", {
    quotation_req_id: { type: DataTypes.INTEGER, allowNull: false },
    vendor_id: { type: DataTypes.INTEGER, allowNull: false },
    quotation_no: { type: DataTypes.STRING(100), allowNull: false },
    quotation_date: { type: DataTypes.DATEONLY, allowNull: false },
    delivery_date: { type: DataTypes.DATEONLY, allowNull: false },
    payment_days: { type: DataTypes.INTEGER, allowNull: true },
    supplier_status: { type: DataTypes.STRING(100), allowNull: true },
    quotation_comparision_approval: { type: DataTypes.TINYINT, allowNull: true },
    delivery_priode: { type: DataTypes.STRING(100), allowNull: true },
    ex_delivery: { type: DataTypes.STRING(100), allowNull: true },
    discount: { type: DataTypes.DECIMAL(15,5), allowNull: true },
    amount: { type: DataTypes.DECIMAL(15,5), allowNull: true },
    payment_terms: { type: DataTypes.STRING(255), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "quotation_comparison_supplier_details",
    timestamps: true,
    underscored: true
  });

  return SupplierDetails;
};
