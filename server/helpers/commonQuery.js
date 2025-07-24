const { Op } = require("sequelize");

module.exports = {
  // 1. Create a new record
  createRecord: async (model, data, transaction = null) => {
    console.log("Creating record:", data);
    return await model.create(data, transaction ? { transaction } : {});
  },

  // 2. Update a record by ID
  updateRecordById: async (model, where, data, transaction = null) => {
    if (!where || !model || !data)
      throw new Error("Invalid parameters passed to updateRecordById.");

    const record = await model.findOne({
      where: { ...where, status: { [Op.ne]: 2 } },
      ...(transaction ? { transaction } : {}),
    });

    if (!record) return null;
    console.log("Update record:", data);
    await record.update(data, transaction ? { transaction } : {});
    return record;
  },

  // 3. Soft delete by ID (status = 2)
  softDeleteById: async (model, where, transaction = null) => {
    if (!where || !model) {
      throw new Error("Invalid parameters passed to softDeleteById.");
    }

    const result = await model.update(
      { status: 2 },
      {
        where: {
          ...where,
          status: { [Op.ne]: 2 },
        },
        ...(transaction ? { transaction } : {}),
      }
    );

    return result; // Returns [number of rows affected]
  },

  // 4. Find all records with filters (excluding deleted by default)
  findAllRecords: async (
    model,
    filters = {},
    includeDeleted = false,
    options = {},
    transaction = null
  ) => {
    // Add `status != 2` filter if not including deleted
    if (!includeDeleted && !filters.status) {
      filters.status = { [Op.ne]: 2 };
    }

    return await model.findAll({
      where: filters,
      ...options,
      ...(transaction ? { transaction } : {}),
    });
  },

  // 5. Find records with joins
  findWithJoin: async ({
    model,
    filters = {},
    include = [],
    includeDeleted = false,
    attributes,
    order,
    limit,
    offset,
    transaction = null,
  }) => {
    const where = { ...filters };
    if (!includeDeleted) where.status = { [Op.ne]: 2 };

    const options = {
      where,
      include,
      order,
    };

    if (attributes) options.attributes = attributes;
    if (limit) options.limit = limit;
    if (offset) options.offset = offset;
    if (transaction) options.transaction = transaction;

    return await model.findAll(options);
  },

  // 6. Find one by ID
  findOneById: async (
    model,
    id,
    includeDeleted = false,
    transaction = null,
    forceReload = false
  ) => {
    const condition = { id };
    if (!includeDeleted) condition.status = { [Op.ne]: 2 };

    const result = await model.findOne({
      where: condition,
      ...(transaction ? { transaction } : {}),
    });

    // If model instance was reused, force reload
    if (result && forceReload) {
      await result.reload({ transaction });
    }

    return result;
  },

  // 7. Hard delete (permanent remove)
  hardDeleteById: async (model, id, transaction = null) => {
    const record = await model.findByPk(id, transaction ? { transaction } : {});
    if (!record) return null;

    await record.destroy(transaction ? { transaction } : {});
    return record;
  },
};
