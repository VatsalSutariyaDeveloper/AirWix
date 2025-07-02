module.exports = (sequelize, DataTypes) => {
  const MenuMasterAccessRoute = sequelize.define("MenuMasterAccessRoute", {
    access_id: { type: DataTypes.INTEGER, allowNull: false },
    access_type: { type: DataTypes.STRING(50), allowNull: false },
    slug_name: { type: DataTypes.STRING(100), allowNull: false },
    route_path: { type: DataTypes.STRING(200), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "menu_master_access_route",
    timestamps: true,
    underscored: true
  });

  return MenuMasterAccessRoute;
};
