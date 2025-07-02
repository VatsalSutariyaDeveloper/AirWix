module.exports = (sequelize, DataTypes) => {
  const MenuMaster = sequelize.define("MenuMaster", {
    menu_name: { type: DataTypes.STRING(100), allowNull: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    out_time: { type: DataTypes.STRING(50), allowNull: true },
    pid: { type: DataTypes.INTEGER, allowNull: false },
    page_name: { type: DataTypes.STRING(100), allowNull: true },
    include_per: { type: DataTypes.STRING(100), allowNull: true },
    icon_name: { type: DataTypes.STRING(50), allowNull: true },
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
    tableName: "menu_master",
    timestamps: true,
    underscored: true
  });

  return MenuMaster;
};
