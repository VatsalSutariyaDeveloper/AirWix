module.exports = (sequelize, DataTypes) => {
  const GodownMaster = sequelize.define("GodownMaster", {
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    address: { type: DataTypes.STRING(255), allowNull: true },
    status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0: Active, 1: Inactive, 2: Deleted" },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "godown_master",
    timestamps: true,
    underscored: true
  });

  return GodownMaster;
};
