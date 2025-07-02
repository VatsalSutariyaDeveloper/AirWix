module.exports = (sequelize, DataTypes) => {
  const PrintPermission = sequelize.define("PrintPermission", {
    print_permission: { type: DataTypes.STRING(100), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "print_permission",
    timestamps: true,
    underscored: true
  });

  return PrintPermission;
};
