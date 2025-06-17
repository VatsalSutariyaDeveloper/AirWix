module.exports = (sequelize, DataTypes) => {
  const CountryMaster = sequelize.define("CountryMaster", {
    country_name: { type: DataTypes.STRING, allowNull: false },
    country_initial: { type: DataTypes.STRING(10), allowNull: false },
    country_code: { type: DataTypes.STRING(10), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "country_master",
    timestamps: true,
    underscored: true
  });

  return CountryMaster;
};
