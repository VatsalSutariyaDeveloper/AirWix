// models/InquiryType.js

module.exports = (sequelize, DataTypes) => {
  const InquiryType = sequelize.define("InquiryType", {
    inquiry_type_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0: Active, 1: Inactive, 2: Deleted
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "inquiry_type",
    timestamps: true,
    underscored: true,
  });

  return InquiryType;
};
