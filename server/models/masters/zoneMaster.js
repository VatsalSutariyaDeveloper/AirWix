module.exports = (sequelize, DataTypes) => {
  const ZoneMaster = sequelize.define("ZoneMaster", {
    zone_name: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "zone_master",
    timestamps: true,
    underscored: true
  });

  return ZoneMaster;
};
