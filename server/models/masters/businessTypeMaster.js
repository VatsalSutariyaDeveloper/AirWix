module.exports = (sequelize, DataTypes) => {
  const BusinessType = sequelize.define("BusinessTypeMaster", {
    business_type_name: { type: DataTypes.STRING(100), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "business_type_master",
    timestamps: true,
    underscored: true
  });

  return BusinessType;
};
