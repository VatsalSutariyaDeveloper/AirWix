module.exports = (sequelize, DataTypes) => {
  const InquiryAttachment = sequelize.define('InquiryAttachment', {
    inquiry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attachment_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachment_file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted",
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
    tableName: 'inquiry_attachment',
    timestamps: true,
    underscored: true
  });

  return InquiryAttachment;
};
