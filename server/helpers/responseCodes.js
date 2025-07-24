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

  // 🔴 File Upload Errors
  FILE_TYPE_NOT_ALLOWED: {
    code: "FILE_TYPE_NOT_ALLOWED",
    status: 400,
    message: "Only JPG, JPEG, PNG, and WEBP image files are allowed."
  },
  FILE_TOO_LARGE: {
    code: "FILE_TOO_LARGE",
    status: 400,
    message: "Image file too large. Maximum allowed size is 2MB."
  },
  FILE_REQUIRED: {
    code: "FILE_REQUIRED",
    status: 400,
    message: "File is required."
  },
  FILE_UPLOAD_FAILED: {
    code: "FILE_UPLOAD_FAILED",
    status: 500,
    message: "File could not be saved due to a server error."
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
    SOFT_DELETE: (name = "Record") => ({
      code: "SOFT_DELETE_SUCCESS",
      status: 200,
      message: `${name} soft deleted successfully`,
    }),

  },
  
};
