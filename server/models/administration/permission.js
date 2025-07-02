module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    user_type_id: { type: DataTypes.INTEGER, allowNull: false },
    menu_id: { type: DataTypes.INTEGER, allowNull: false },
    permission: { type: DataTypes.STRING(50), allowNull: false },
    add_permission: { type: DataTypes.BOOLEAN, defaultValue: false },
    edit_permission: { type: DataTypes.BOOLEAN, defaultValue: false },
    delete_permission: { type: DataTypes.BOOLEAN, defaultValue: false },
    other_permission: { type: DataTypes.BOOLEAN, defaultValue: false },
    approve_permission: { type: DataTypes.BOOLEAN, defaultValue: false },
    final_approve_permission: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "permission",
    timestamps: true,
    underscored: true
  });

  return Permission;
};
