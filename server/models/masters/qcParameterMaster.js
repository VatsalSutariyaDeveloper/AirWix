module.exports = (sequelize, DataTypes) => {
  const QcParameterMaster = sequelize.define("QcParameterMaster", {
    parameter_name: { type: DataTypes.STRING(100), allowNull: false },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "qc_parameter_master",
    timestamps: true,
    underscored: true
  });

  return QcParameterMaster;
};
