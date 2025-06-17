module.exports = (sequelize, DataTypes) => {
  const BranchMaster = sequelize.define("BranchMaster", {
    branch_name: { type: DataTypes.STRING(100), allowNull: false },
    country: { type: DataTypes.STRING(100), allowNull: false },
    state: { type: DataTypes.STRING(100), allowNull: false },
    city: { type: DataTypes.STRING(100), allowNull: false },
    pincode: { type: DataTypes.STRING(20), allowNull: false },
    zone: { type: DataTypes.STRING(100), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = active, 1 = inactive, 2 = deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "branch_master",
    timestamps: true,
    underscored: true
  });

  return BranchMaster;
};
