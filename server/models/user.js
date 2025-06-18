const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust path if needed

const User = sequelize.define('user', {
  ledger_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  user_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authorized_signature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  common_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  report_to_user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  report_to_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  question_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  question_answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  template_access_params_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_access_permission_ids: {
    type: DataTypes.STRING, // comma-separated string
    allowNull: true,
  },
  menu_show_permission_ids: {
    type: DataTypes.STRING, // comma-separated string
    allowNull: true,
  },
  temp_otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  device_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  user_access_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  user_lock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    comment: "0 = active, 1 = inactive, 2 = deleted"
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  branch_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true
});

module.exports = User;
