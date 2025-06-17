const fs = require('fs');
const path = require('path');
const { User } = require('../models');
const { validateRequest } = require('../helpers/validateRequest');
const commonQuery = require('../helpers/commonQuery');

const MODULE = 'User';

const allowedFields = [
  'ledger_id', 'user_name', 'email', 'user_key', 'user_type', 'authorized_signature',
  'common_email', 'phone', 'company_name', 'address', 'city_id', 'state_id', 'country_id',
  'pincode', 'report_to_user_type_id', 'report_to_user_id', 'question_id', 'question_answer',
  'template_access_params_id', 'user_access_permission_ids', 'menu_show_permission_ids',
  'temp_otp', 'device_id', 'ip_address', 'payment_status', 'user_access_date', 'user_lock',
  'status', 'user_id', 'branch_id', 'company_id', 'created_at', 'updated_at'
];

exports.create = async (req, res) => {
  const requiredFields = {
    user_name: "User Name",
    email: "Email",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: User,
      fields: ['email'],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const userData = allowedFields.reduce((acc, key) => {
    if (req.body[key] !== undefined) acc[key] = req.body[key];
    return acc;
  }, {});

  // Handle signature upload (after validation)
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const filename = `signature_${Date.now()}${ext}`;
    const uploadPath = path.join('public/uploads/signatures', filename);

    try {
      fs.writeFileSync(uploadPath, req.file.buffer);
      userData.authorized_signature = `/uploads/signatures/${filename}`;
    } catch (err) {
      return res.error("FILE_UPLOAD_ERROR", { error: err.message });
    }
  }

  try {
    const result = await commonQuery.createRecord(User, userData);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.success("LIST", MODULE, users);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.error("NOT_FOUND", { message: "User not found" });

    return res.success("GET", MODULE, user);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.error("NOT_FOUND", { message: "User not found" });

    const updateData = allowedFields.reduce((acc, key) => {
      if (req.body[key] !== undefined) acc[key] = req.body[key];
      return acc;
    }, {});

    // Handle signature update
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const filename = `signature_${Date.now()}${ext}`;
      const uploadPath = path.join('public/uploads/signatures', filename);
      fs.writeFileSync(uploadPath, req.file.buffer);
      updateData.authorized_signature = `/uploads/signatures/${filename}`;
    }

    await user.update(updateData);
    return res.success("UPDATE", MODULE, user);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.error("NOT_FOUND", { message: "User not found" });

    await user.destroy();
    return res.success("DELETE", MODULE, { id: req.params.id });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
