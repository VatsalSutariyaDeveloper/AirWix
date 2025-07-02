module.exports = (sequelize, DataTypes) => {
  const MenuMasterAccess = sequelize.define("MenuMasterAccess", {
    parent_id: { type: DataTypes.INTEGER, allowNull: true },
    menu_name: { type: DataTypes.STRING(100), allowNull: false },
    menu_path: { type: DataTypes.STRING(150), allowNull: false },
    menu_description: { type: DataTypes.TEXT, allowNull: true },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    menu_icon_name: { type: DataTypes.STRING(50), allowNull: true },
    menu_image_url: { type: DataTypes.STRING(255), allowNull: true },
    report_status: { type: DataTypes.TINYINT, defaultValue: 0 },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "menu_master_access",
    timestamps: true,
    underscored: true
  });

  return MenuMasterAccess;
};
