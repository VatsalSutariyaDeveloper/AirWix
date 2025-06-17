module.exports = (sequelize, DataTypes) => {
  const InquiryTypeMaster = sequelize.define("InquiryTypeMaster", {
    inquiry_type_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "inquiry_type_master",
    timestamps: true,
    underscored: true
  });

  return InquiryTypeMaster;
};
