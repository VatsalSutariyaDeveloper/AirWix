module.exports = (sequelize, DataTypes) => {
  const AppointmentMaster = sequelize.define("AppointmentMaster", {
    location: { type: DataTypes.STRING(100), allowNull: false },
    full_day_event: { type: DataTypes.STRING(10), allowNull: false }, // Yes / No
    start_time: { type: DataTypes.STRING(50), allowNull: false },
    end_time: { type: DataTypes.STRING(50), allowNull: false },
    subject: { type: DataTypes.STRING(100), allowNull: false },
    remark: { type: DataTypes.TEXT, allowNull: true },
    invite_to: { type: DataTypes.INTEGER, allowNull: false }, // User ID
    ref_type_id: { type: DataTypes.INTEGER, allowNull: true },
    ref_id: { type: DataTypes.STRING(100), allowNull: true }, // Ref Title
    alert_type: { type: DataTypes.STRING(100), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "appointment_masters",
    timestamps: true,
    underscored: true
  });

  return AppointmentMaster;
};
