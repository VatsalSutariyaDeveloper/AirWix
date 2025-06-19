const fs = require('fs');
const path = require('path');
const User = require('../models/user'); // ✅ Make sure path is correct
const validateRequest = require('../helpers/validateRequest');
const commonQuery = require('../helpers/commonQuery');

const MODULE = 'User';

const allowedFields = [
  'ledger_id', 'user_name', 'email', 'user_key', 'user_code', 'user_type', 'authorized_signature',
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

  let filename = null;

  // Step 1: Prepare filename if file exists
  if (req.file && req.file.originalname) {
    const ext = path.extname(req.file.originalname).toLowerCase();
    const name = path.basename(req.file.originalname, ext).replace(/\s+/g, "_");
    filename = `${Date.now()}_${name}${ext}`;
    userData.authorized_signature = `/uploads/signatures/${filename}`;
  }

  try {
    // Step 2: Save data to DB
    const result = await commonQuery.createRecord(User, userData);

    // Step 3: Now store image file with the DB-saved name
    if (req.file && req.file.buffer && filename) {
      const folder = "public/uploads/signatures";
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

      const uploadPath = path.join(folder, filename);
      fs.writeFileSync(uploadPath, req.file.buffer);
    }

    return res.success("CREATE", "USER", result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await commonQuery.findAllRecords(User);

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const usersWithImageUrl = users.map(user => {
      const data = user.toJSON();
      if (data.authorized_signature) {
        data.authorized_signature = `${baseUrl}${data.authorized_signature}`;
      }
      return data;
    });

    return res.success("LIST", MODULE, usersWithImageUrl);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await commonQuery.findOneById(User, req.params.id);
    if (!user) return res.error("NOT_FOUND", { message: "User not found" });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const userData = user.toJSON();

    if (userData.authorized_signature) {
      userData.authorized_signature = `${baseUrl}${userData.authorized_signature}`;
    }

    return res.success("GET", MODULE, userData);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await commonQuery.findOneById(User, req.params.id);
    if (!user) return res.error("NOT_FOUND", { message: "User not found" });

    const updateData = allowedFields.reduce((acc, key) => {
      if (req.body[key] !== undefined) acc[key] = req.body[key];
      return acc;
    }, {});

    let filename = null;

    // ✅ Store old image path BEFORE update
    const oldImagePath = user.authorized_signature
      ? path.join("public", user.authorized_signature)
      : null;

    // Step 1: Prepare image name if file exists
    if (req.file && req.file.originalname) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const name = path.basename(req.file.originalname, ext).replace(/\s+/g, "_");
      filename = `${Date.now()}_${name}${ext}`;
      updateData.authorized_signature = `/uploads/signatures/${filename}`;
    }

    if (updateData.authorized_signature === '') {
      delete updateData.authorized_signature;
    }

    // Step 2: Update DB with image name
     const result = await commonQuery.updateRecordById(User, req.params.id, updateData);

    // Step 3: Save file to disk if needed
    if (req.file && req.file.buffer && filename) {
      const folder = "public/uploads/signatures";
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

      const uploadPath = path.join(folder, filename);
      fs.writeFileSync(uploadPath, req.file.buffer);

      // ✅ Delete old image (now safe)
      if (oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return res.success("UPDATE", "USER", result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Soft delete: set status = 2
exports.softDeleteUser = async (req, res) => {
  try {
    const user = await commonQuery.softDeleteById(User, req.params.id);
    if (!user) return res.error("NOT_FOUND", { message: "User not found or already deleted" });

    return res.success("SOFT_DELETE", "USER", { id: req.params.id });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Hard delete: remove record and image
exports.hardDeleteUser = async (req, res) => {
  try {
    const user = await commonQuery.findOneById(User, req.params.id, true); // Fetch even if soft deleted
    if (!user) return res.error("NOT_FOUND", { message: "User not found" });

    // Delete image if it exists
    if (user.authorized_signature) {
      const imagePath = path.join("public", user.authorized_signature);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await commonQuery.hardDeleteById(User, req.params.id);

    return res.success("DELETE", "USER", { id: req.params.id });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


