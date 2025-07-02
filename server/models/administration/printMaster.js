module.exports = (sequelize, DataTypes) => {
  const PrintMaster = sequelize.define("PrintMaster", {
    print_type_id: { type: DataTypes.INTEGER, allowNull: false },
    print_name: { type: DataTypes.STRING(100), allowNull: false },
    icon_name: { type: DataTypes.STRING(100), allowNull: false },
    page_path: { type: DataTypes.STRING(255), allowNull: false },
    color_code: { type: DataTypes.STRING(20), allowNull: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    approve_status: { type: DataTypes.STRING(20), allowNull: false },
    without_logo: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "print_master",
    timestamps: true,
    underscored: true
  });

  return PrintMaster;
};
