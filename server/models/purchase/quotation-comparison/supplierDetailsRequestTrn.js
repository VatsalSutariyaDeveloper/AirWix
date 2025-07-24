module.exports = (sequelize, DataTypes) => {
  const SupplierDetailsRequestTrn = sequelize.define("SupplierDetailsRequestTrn", {
    qc_request_trn_id: { type: DataTypes.INTEGER, allowNull: true },
    supplier_details_id: { type: DataTypes.INTEGER },
    vendor_id: { type: DataTypes.INTEGER, allowNull: true },
    product_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    delivery_date: { type: DataTypes.DATEONLY, allowNull: true },
    payment_days: { type: DataTypes.INTEGER, allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = Active, 1 = Inactive, 2 = Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "supplier_details_request_trn",
    timestamps: true,
    underscored: true
  });

  return SupplierDetailsRequestTrn;
};
