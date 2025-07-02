module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    ledger_id: { type: DataTypes.INTEGER, allowNull: true },
    user_name: { type: DataTypes.STRING(100), allowNull: false },
    user_code: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    user_key: { type: DataTypes.STRING(100), allowNull: true },
    user_type: { type: DataTypes.STRING(50), allowNull: true },
    authorized_signature: { type: DataTypes.STRING(255), allowNull: true },
    common_email: { type: DataTypes.STRING(100), allowNull: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    company_name: { type: DataTypes.STRING(100), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    city_id: { type: DataTypes.INTEGER, allowNull: true },
    state_id: { type: DataTypes.INTEGER, allowNull: true },
    country_id: { type: DataTypes.INTEGER, allowNull: true },
    pincode: { type: DataTypes.STRING(10), allowNull: true },
    report_to_user_type_id: { type: DataTypes.INTEGER, allowNull: true },
    report_to_user_id: { type: DataTypes.INTEGER, allowNull: true },
    question_id: { type: DataTypes.STRING(100), allowNull: true },
    question_answer: { type: DataTypes.STRING(100), allowNull: true },
    template_access_params_id: { type: DataTypes.INTEGER, allowNull: true },
    user_access_permission_ids: { type: DataTypes.STRING(255), allowNull: true }, // comma-separated
    menu_show_permission_ids: { type: DataTypes.STRING(255), allowNull: true }, // comma-separated
    temp_otp: { type: DataTypes.STRING(10), allowNull: true },
    device_id: { type: DataTypes.STRING(100), allowNull: true },
    ip_address: { type: DataTypes.STRING(50), allowNull: true },
    payment_status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    user_access_date: { type: DataTypes.DATE, allowNull: true },
    user_lock: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    branch_id: { type: DataTypes.INTEGER, allowNull: true },
    company_id: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: "users",
    timestamps: true,
    underscored: true
  });

  return User;
};
