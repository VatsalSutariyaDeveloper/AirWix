module.exports = (sequelize, DataTypes) => {
  const FollowUp = sequelize.define("FollowUp", {
    task_type_id: { type: DataTypes.INTEGER, allowNull: false },
    ref_type_id: { type: DataTypes.INTEGER },
    ref_title: { type: DataTypes.STRING },
    stage_id: { type: DataTypes.INTEGER },
    sales_stage_id: { type: DataTypes.INTEGER },
    remark: { type: DataTypes.TEXT },
    note: { type: DataTypes.TEXT },
    assign_to: { type: DataTypes.INTEGER, allowNull: false },
    priority: { type: DataTypes.STRING }, // High / Medium / Low
    next_followup_date: { type: DataTypes.DATE },
    alert_type_id: { type: DataTypes.INTEGER },
    email_template_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "followup",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  return FollowUp;
};
