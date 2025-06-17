module.exports = (sequelize, DataTypes) => {
  const UserTypeMaster = sequelize.define("UserTypeMaster", {
    user_type_name: { type: DataTypes.STRING(100), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = active, 1 = inactive, 2 = deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "user_type_master",
    timestamps: true,
    underscored: true
  });

  return UserTypeMaster;
};
