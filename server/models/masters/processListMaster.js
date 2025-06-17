module.exports = (sequelize, DataTypes) => {
  const ProcessListMaster = sequelize.define("ProcessListMaster", {
    process_type_id: { type: DataTypes.INTEGER, allowNull: false },
    process_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    priority: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0: Active, 1: Inactive, 2: Deleted" },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "process_list_master",
    timestamps: true,
    underscored: true
  });

  return ProcessListMaster;
};
