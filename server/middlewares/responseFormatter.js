const responseCodes = require("../helpers/responseCodes");

module.exports = (req, res, next) => {
  res.success = (action, module = "Record", data = null) => {
    let responseObj;

    // If it's a success type (e.g., FETCH, CREATE), use responseCodes.SUCCESS
    if (responseCodes.SUCCESS[action]) {
      responseObj = responseCodes.SUCCESS[action](module);
    } else {
      // fallback if action not found
      responseObj = {
        code: "SUCCESS",
        status: 200,
        message: `${module} action succeeded`,
      };
    }

    return res.status(responseObj.status).json({
      ...responseObj,
      data,
    });
  };

  res.error = (type, details = {}) => {
    const responseObj = responseCodes[type] || responseCodes.SERVER_ERROR;
    
    return res.status(responseObj.status).json({
      ...responseObj,
      ...details,
    });
  };

  next();
};