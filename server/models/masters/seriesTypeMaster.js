module.exports = (sequelize, DataTypes) => {
  const SeriesTypeMaster = sequelize.define("SeriesTypeMaster", {
    module_id: { type: DataTypes.INTEGER, allowNull: false },
    financial_year_id: { type: DataTypes.INTEGER, allowNull: false },
    series_type_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    start_series: { type: DataTypes.INTEGER, allowNull: false },
    series_format: { type: DataTypes.INTEGER, allowNull: false },
    format_value: { type: DataTypes.STRING(50), allowNull: false },
    end_format_value: { type: DataTypes.STRING(50), allowNull: false },
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
