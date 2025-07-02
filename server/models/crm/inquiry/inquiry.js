module.exports = (sequelize, DataTypes) => {
  const Inquiry = sequelize.define("Inquiry", {
    inquiry_no: { type: DataTypes.STRING(100), allowNull: false },
    inquiry_date: { type: DataTypes.DATEONLY, allowNull: false },
    inquiry_reference: { type: DataTypes.STRING(255), allowNull: true },
    inquiry_closing_date: { type: DataTypes.DATEONLY, allowNull: true },
    inquiry_type_id: { type: DataTypes.INTEGER, allowNull: true},
    inquiry_task_id: { type: DataTypes.INTEGER, allowNull: true },
    inquiry_category_id: { type: DataTypes.INTEGER, allowNull: true},
    assign_to: { type: DataTypes.INTEGER, allowNull: true, comment: "User ID" },
    party_id: { type: DataTypes.INTEGER, allowNull: true },
    contact_person_id: { type: DataTypes.INTEGER, allowNull: true },
    stage_id: { type: DataTypes.INTEGER, allowNull: true },
    sales_stage_id: { type: DataTypes.INTEGER, allowNull: true},
    currency_id: { type: DataTypes.INTEGER, allowNull: true },
    gst_type_id: { type: DataTypes.INTEGER, allowNull: true, comment: "Administration GST Type Master ID" },
    gst_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    currency_rate: { type: DataTypes.DECIMAL(10, 4), allowNull: true },
    priority: { type: DataTypes.ENUM("High", "Medium", "Low"), allowNull: true },
    followup_date: { type: DataTypes.DATEONLY, allowNull: true },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "inquiries",
    timestamps: true,
    underscored: true
  });

  return Inquiry;
};
