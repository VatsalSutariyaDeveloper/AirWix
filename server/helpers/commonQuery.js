  const { Op } = require("sequelize");

  module.exports = {
    // 1. Create a new record
    createRecord: async (model, data) => {
      return await model.create(data);
    },

    // 2. Update a record by ID
    updateRecordById: async (model, id, data) => {
      const record = await model.findByPk(id);
      if (!record || record.status === 2) return null;
      await record.update(data);
      return record;
    },

    // 3. Soft delete by ID (status = 2)
    softDeleteById: async (model, id) => {
      const record = await model.findByPk(id);
      if (!record || record.status === 2) return null;
      await record.update({ status: 2 });
      return record;
    },

    // 4. Find records with dynamic filters
    findAllRecords: async (model, filters = {}, includeDeleted = false) => {
      if (!includeDeleted) filters.status = { [Op.ne]: 2 };
      return await model.findAll({ where: filters });
    },

    // 5. Find one by ID (optionally exclude deleted)
    findOneById: async (model, id, includeDeleted = false) => {
      const condition = { id };
      if (!includeDeleted) condition.status = { [Op.ne]: 2 };
      return await model.findOne({ where: condition });
    },

    // 6. Hard Delete by ID (Delete Data)
    hardDeleteById: async (model, id) => {
      const record = await model.findByPk(id);
      if (!record) return null;
      await record.destroy(); // permanently delete from DB
      return record;
    },
  };
