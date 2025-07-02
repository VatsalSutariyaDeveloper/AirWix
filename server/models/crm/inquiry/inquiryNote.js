module.exports = (sequelize, DataTypes) => {
  const InquiryNote = sequelize.define('InquiryNote', {
    inquiry_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted'
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'inquiry_notes',
    timestamps: true,
    underscored: true
  });

  return InquiryNote;
};
