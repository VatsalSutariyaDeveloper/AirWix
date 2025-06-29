
module.exports = (sequelize, DataTypes) => {
  const ReasonMaster = sequelize.define("ReasonMaster", {
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0: Active, 1: Inactive, 2: Deleted
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "reason_master",
    timestamps: true,
    underscored: true,
  });

  return ReasonMaster;
};
