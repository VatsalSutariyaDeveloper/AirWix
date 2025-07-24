module.exports = (sequelize, DataTypes) => {
  const LedgerGroup = sequelize.define("LedgerGroup", {
    parent_group_id: { type: DataTypes.INTEGER, allowNull: true },
    group_name: { type: DataTypes.STRING(100), allowNull: false },
    opening_balance: { type: DataTypes.DECIMAL(115,5), allowNull: true },
    start_series: { type: DataTypes.STRING(100), allowNull: true },
    series_formet: { type: DataTypes.STRING(50), allowNull: true },
    formet_value: { type: DataTypes.STRING(50), allowNull: true },
    end_formet_value: { type: DataTypes.STRING(50), allowNull: true },
    priority: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "ledger_group",
    timestamps: true,
    underscored: true
  });

  return LedgerGroup;
};
