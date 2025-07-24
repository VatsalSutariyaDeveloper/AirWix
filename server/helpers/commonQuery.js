const { Op } = require("sequelize");

module.exports = {
  // 1. Create a new record
 createRecord: async (model, data, transaction = null) => {
  return await model.create(data, transaction ? { transaction } : {});
},
// createRecord: async (model, data, transaction = null) => {
//   const filteredData = Object.fromEntries(
//     Object.entries(data).filter(([key]) => key in model.rawAttributes)
//   );

//   const options = {};
//   if (transaction) options.transaction = transaction;

//   return await model.create(filteredData, options);
// }




  // 2. Update a record by ID
  updateRecordById: async (model, where, data) => {
  if (!where || !model || !data)
    throw new Error("Invalid parameters passed to updateRecordById.");

  const condition = typeof where === "object" ? where : { id: where };

  const record = await model.findOne({
    where: { ...condition, status: { [Op.ne]: 2 } },
  });

  if (!record) return null;

  await record.update(data);
  return record;
},


  // 3. Soft delete by ID (status = 2)
  softDeleteById: async (model, where) => {
    if (!where || !model)
      throw new Error("Invalid parameters passed to softDeleteByCondition.");
    const result = await model.update(
      { status: 2 },
      { where: { ...where, status: { [Op.ne]: 2 } } }
    );
    return result; // [affectedRowsCount]
  },

  // 4. Find records with dynamic filters
  findAllRecords: async (
    model,
    filters = {},
    includeDeleted = false,
    options = {}
  ) => {
    if (!includeDeleted) {
      filters.status = { [Op.ne]: 2 };
    }

    return await model.findAll({
      where: filters,
      ...options, // merge includes, order, group, etc.
    });
  },

  // 4. Find records with dynamic filters
  findWithJoin: async ({
    model,
    filters = {},
    include = [],
    includeDeleted = false,
    attributes,
    order,
    limit,
    offset,
  }) => {
    const options = {
      where: filters,
      include,
      order,
    };

    if (attributes) options.attributes = attributes;
    if (limit) options.limit = limit;
    if (offset) options.offset = offset;

    return await model.findAll(options);
  },

// 5. Find one by ID (optionally exclude deleted), with optional transaction
findOneById: async (model, id, includeDeleted = false, transaction = null) => {
  const condition = { id };
  if (!includeDeleted) condition.status = { [Op.ne]: 2 };

  const options = {
    where: condition,
  };

  if (transaction) options.transaction = transaction;

  return await model.findOne(options);
},


  // 6. Hard Delete by ID (Delete Data)
  hardDeleteById: async (model, id) => {
    const record = await model.findByPk(id);
    if (!record) return null;
    await record.destroy(); // permanently delete from DB
    return record;
  },
};
