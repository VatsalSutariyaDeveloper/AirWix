module.exports = (sequelize, DataTypes) => {
  const HSNMaster = sequelize.define('HSNMaster', {
    hsn_code: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'hsn_masters',
    timestamps: true,
    underscored: true
  });

  return HSNMaster;
};
