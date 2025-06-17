module.exports = (sequelize, DataTypes) => {
  const LedgerMaster = sequelize.define("LedgerMaster", {
    ledger_name: { type: DataTypes.STRING(100), allowNull: false },
    alias_name: { type: DataTypes.STRING(100), allowNull: true },
    ledger_code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    ledger_group: { type: DataTypes.STRING(100), allowNull: false },
    profile_photo: { type: DataTypes.STRING(255), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
    opening_balance_type: { type: DataTypes.STRING(50), allowNull: true },
    opening_balance: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    state_id: { type: DataTypes.INTEGER, allowNull: true },
    city_id: { type: DataTypes.INTEGER, allowNull: true },
    country_id: { type: DataTypes.INTEGER, allowNull: true },
    pincode: { type: DataTypes.STRING(10), allowNull: true },
    balance_type: { type: DataTypes.STRING(10), allowNull: false },
    ledger_type: { type: DataTypes.STRING(20), allowNull: false },
    msme_no: { type: DataTypes.STRING(50), allowNull: true },
    business_type: { type: DataTypes.STRING(100), allowNull: true },
    business_category: { type: DataTypes.STRING(50), allowNull: true },
    enable_cost_center: { type: DataTypes.BOOLEAN, defaultValue: false },
    pan_it_no: { type: DataTypes.STRING(20), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "ledger_master",
    timestamps: true,
    underscored: true,
  });

  return LedgerMaster;
};
