module.exports = (sequelize, DataTypes) => {
  const QuotationAttachment = sequelize.define("QuotationAttachment", {
    quotation_id: { type: DataTypes.INTEGER },
    attachment_name: { type: DataTypes.STRING(255) },
    attachment_file: { type: DataTypes.STRING(255) },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "quotation_attachment",
    timestamps: true,
    underscored: true
  });

  return QuotationAttachment;
};
