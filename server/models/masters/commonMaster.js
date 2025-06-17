module.exports = (sequelize, DataTypes) => {
  const CommonMaster = sequelize.define("CommonMaster", {
    common_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    master_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT('medium'),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
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
    tableName: "common_master",
    timestamps: true,
    underscored: true,
  });

  return CommonMaster;
};
