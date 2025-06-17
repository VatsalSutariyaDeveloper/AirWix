module.exports = (sequelize, DataTypes) => {
  const BankMaster = sequelize.define("BankMaster", {
    bank_name: { type: DataTypes.STRING(100), allowNull: false },
    branch_name: { type: DataTypes.STRING(100), allowNull: false },
    account_number: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    ifsc_code: { type: DataTypes.STRING(20), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "bank_master",
    timestamps: true,
    underscored: true
  });

  return BankMaster;
};
