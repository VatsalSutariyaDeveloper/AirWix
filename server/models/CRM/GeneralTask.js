// models/GeneralTask.js

module.exports = (sequelize, DataTypes) => {
  const GeneralTask = sequelize.define("GeneralTask", {
    general_task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0: Active, 1: Inactive, 2: Deleted
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
    tableName: "general_task",
    timestamps: true,
    underscored: true,
  });

  return GeneralTask;
};
