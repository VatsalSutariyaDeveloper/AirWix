module.exports = (sequelize, DataTypes) => {
  const followUp = sequelize.define("followUp", {
    task_type_id: { type: DataTypes.INTEGER, allowNull: false },
    ref_type_id: { type: DataTypes.INTEGER, allowNull: false },
    ref_id: { type: DataTypes.INTEGER, allowNull: false },
    stage_id: { type: DataTypes.INTEGER, allowNull: true },
    sales_stage_id: { type: DataTypes.INTEGER, allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
    note: { type: DataTypes.TEXT, allowNull: true },
    assign_to: { type: DataTypes.INTEGER, allowNull: false },
    priority: { type: DataTypes.STRING(10), allowNull: false },
    next_followup_date: { type: DataTypes.DATEONLY, allowNull: false },
    alert_type_id: { type: DataTypes.INTEGER, allowNull: true },
    email_template_id: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "follow_ups",
    timestamps: true,
    underscored: true
  });

  return followUp;
};
