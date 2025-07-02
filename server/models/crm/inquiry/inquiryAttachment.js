module.exports = (sequelize, DataTypes) => {
  const InquiryAttachment = sequelize.define("InquiryAttachment", {
    inquiry_id: { type: DataTypes.INTEGER, allowNull: false },
    attachment_name: { type: DataTypes.STRING(100), allowNull: false },
    attachment_file: { type: DataTypes.STRING(255), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "inquiry_attachments",
    timestamps: true,
    underscored: true
  });

  return InquiryAttachment;
};
