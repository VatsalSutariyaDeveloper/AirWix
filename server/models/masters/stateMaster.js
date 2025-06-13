module.exports = (sequelize, DataTypes) => {
  const StateMaster = sequelize.define("StateMaster", {
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    state_name: { type: DataTypes.STRING, allowNull: false },
    gst_code: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "state_master",
    timestamps: true,
    underscored: true
  });

  return StateMaster;
};
