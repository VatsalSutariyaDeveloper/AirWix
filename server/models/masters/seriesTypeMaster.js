module.exports = (sequelize, DataTypes) => {
  const SeriesTypeMaster = sequelize.define("SeriesTypeMaster", {
    module_name_id: { type: DataTypes.INTEGER, allowNull: false },
    series_type_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    start_series: { type: DataTypes.STRING(50), allowNull: true },
    series_formet: { type: DataTypes.STRING(50), allowNull: true },
    formet_value: { type: DataTypes.STRING(50), allowNull: true },
    end_formet_value: { type: DataTypes.STRING(50), allowNull: true },
    gst_code: { type: DataTypes.STRING(20), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "series_type_master",
    timestamps: true,
    underscored: true,
  });

  return SeriesTypeMaster;
};
