module.exports = (sequelize, DataTypes) => {
  const BillSundryTransaction = sequelize.define("BillSundryTransaction", {
    sundry_id: { type: DataTypes.INTEGER, allowNull: false },
    module_id: { type: DataTypes.INTEGER, allowNull: false },
    module_transaction_id: { type: DataTypes.INTEGER, allowNull: false },
    currency_id: { type: DataTypes.INTEGER, allowNull: true },
    currency_rate: { type: DataTypes.DECIMAL(14, 5), allowNull: true },
    sundry_amount: { type: DataTypes.DECIMAL(14, 5), allowNull: false },
    sundry_convert_amount: { type: DataTypes.DECIMAL(14, 5), allowNull: true },
    sundry_gst_per: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    sundry_gst_amount: { type: DataTypes.DECIMAL(14, 5), allowNull: true },
    sundry_gst_convert_amount: { type: DataTypes.DECIMAL(14, 5), allowNull: true },
    tds_per: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    tds_amount: { type: DataTypes.DECIMAL(14, 5), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "bill_sundry_transactions",
    timestamps: true,
    underscored: true,
  });

  return BillSundryTransaction;
};
