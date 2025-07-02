module.exports = (sequelize, DataTypes) => {
  const TemplateAccessPermission = sequelize.define("TemplateAccessPermission", {
    template_name: { type: DataTypes.STRING(100), allowNull: false },
    template_access_permission_ids: { type: DataTypes.STRING(255), allowNull: false },
    template_menu_show_permission_ids: { type: DataTypes.STRING(255), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "template_access_permission",
    timestamps: true,
    underscored: true
  });

  return TemplateAccessPermission;
};
