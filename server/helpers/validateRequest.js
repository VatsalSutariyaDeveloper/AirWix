/**
 * Validates required fields and optionally checks for uniqueness.
 * Trims all string fields automatically before validation.
 * 
 * @param {Object} body - The request body (e.g., req.body)
 * @param {Object} fieldsWithLabels - Object mapping field keys to readable labels
 * @param {Object} [options] - Optional settings
 * @param {Object} [options.uniqueCheck] - { model: SequelizeModel, fields: ["field_name"], excludeId: optionalId }
 * @returns {Promise<string[]>} Array of error messages
 */
async function validateRequest(body, fieldsWithLabels = {}, options = {}) {
  const errors = [];

  // ✅ Trim all string values in the request body
  for (const key in body) {
    if (typeof body[key] === "string") {
      body[key] = body[key].trim();
    }
  }

  // Validate required fields
  for (const field in fieldsWithLabels) {
    const value = body[field];
    const label =
      fieldsWithLabels[field] ||
      field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      errors.push(`${label} is required`);
    }
  }

  // Validate uniqueness
  if (options.uniqueCheck && options.uniqueCheck.model && Array.isArray(options.uniqueCheck.fields)) {
    const { model, fields, excludeId } = options.uniqueCheck;
    const { Op } = require("sequelize");

    for (const field of fields) {
      if (body[field]) {
        const where = { [field]: body[field], status: { [Op.ne]: 2 } };
        if (excludeId) where.id = { [Op.ne]: excludeId };

        const existing = await model.findOne({ where });
        if (existing) {
          const label =
            fieldsWithLabels[field] ||
            field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          errors.push(`${label} must be unique`);
        }
      }
    }
  }

  return errors;
}

module.exports = validateRequest;
