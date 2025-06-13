const responseCodes = require("../helpers/responseCodes");

// module.exports = (req, res, next) => {
//   res.error = (type, extra = {}) => {
//     const codeObj = responseCodes[type] || responseCodes.SERVER_ERROR;
//     return res.status(codeObj.status).json({
//       code: codeObj.code,
//       message: codeObj.message,
//       ...extra,
//     });
//   };

//   res.success = (action = "CREATE", name = "Record", data = {}) => {
//     const codeObj = responseCodes.SUCCESS?.[action]?.(name);
//     if (!codeObj) {
//       return res.status(200).json({ message: "Success", data });
//     }

//     return res.status(codeObj.status).json({
//       code: codeObj.code,
//       message: codeObj.message,
//       data,
//     });
//   };

//   next();
// };
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