module.exports = (sequelize, DataTypes) => {
  const Inquiry = sequelize.define("Inquiry", {
    inquiry_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inquiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    party_id: DataTypes.INTEGER,
    contact_person_id: DataTypes.INTEGER,
    inquiry_reference: DataTypes.STRING,
    inquiry_closing_date: DataTypes.DATEONLY,
    stage_id: DataTypes.INTEGER,
    sales_stage_id: DataTypes.INTEGER,
    inquiry_type_id: DataTypes.INTEGER,
    inquiry_category: DataTypes.INTEGER,
    currency_id: DataTypes.INTEGER,
    currency_rate: DataTypes.FLOAT,
    assign_to: DataTypes.INTEGER,
    priority: DataTypes.ENUM('High', 'Medium', 'Low'),
    inquiry_task_id: DataTypes.INTEGER,
    follow_up_date: DataTypes.DATEONLY,
    gst_type_id: DataTypes.INTEGER,
    gst_amount: DataTypes.FLOAT,
    total_amount: DataTypes.FLOAT,
    remark: DataTypes.TEXT,
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
  }, {
    tableName: "inquiry",
    timestamps: true,
    underscored: true,
  });

  return Inquiry;
};
