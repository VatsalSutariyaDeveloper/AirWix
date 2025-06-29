// models/appointment.js
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_day_event: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remark: {
      type: DataTypes.TEXT,
    },
    invite_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ref_type_id: {
      type: DataTypes.INTEGER,
    },
    ref_title: {
      type: DataTypes.STRING,
    },
    alert_type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: "appointment",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Appointment;
};
