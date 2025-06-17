module.exports = (sequelize, DataTypes) => {
  const HSNMaster = sequelize.define("HSNMaster", {
    hsn_code: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = active, 1 = inactive, 2 = deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "hsn_master",
    timestamps: true,
    underscored: true
  });

  return HSNMaster;
};
