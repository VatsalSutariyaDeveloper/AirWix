module.exports = {
  // 🔴 Error Responses
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    status: 400,
    message: "Validation failed",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    status: 404,
    message: "Resource not found",
  },
  ALREADY_DELETED: {
    code: "ALREADY_DELETED",
    status: 410,
    message: "Resource already deleted",
  },
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    status: 500,
    message: "Internal server error",
  },
  UNIQUE_CONSTRAINT: {
    code: "UNIQUE_CONSTRAINT",
    status: 409,
    message: "Unique constraint violation",
  },

  // ✅ Success Responses
  SUCCESS: {
    FETCH: (name = "Record") => ({
      code: "FETCH_SUCCESS",
      status: 200,
      message: `${name} fetched successfully`,
    }),
    CREATE: (name = "Record") => ({
      code: "CREATE_SUCCESS",
      status: 201,
      message: `${name} created successfully`,
    }),
    UPDATE: (name = "Record") => ({
      code: "UPDATE_SUCCESS",
      status: 200,
      message: `${name} updated successfully`,
    }),
    DELETE: (name = "Record") => ({
      code: "DELETE_SUCCESS",
      status: 200,
      message: `${name} deleted successfully`,
    }),
  },
};
