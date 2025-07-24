const { QCSupplierDetails } = require("../../../models/purchaseModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const MODULE = "Supplier Quotation Details";


// Create
exports.create = async (req, res) => {
  const requiredFields = {
    quotation_req_id: "Quotation Req",
    vendor_id: "vendor",
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    delivery_date: "Delivery Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(QCSupplierDetails, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(QCSupplierDetails, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(QCSupplierDetails, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    quotation_req_id: "Quotation Req",
    vendor_id: "vendor",
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    delivery_date: "Delivery Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(QCSupplierDetails, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (Soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(QCSupplierDetails, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


const upload = multer({ dest: 'uploads/' }).single('file');

const PARSEUR_API_KEY = '22b3d2f0d33a00341e583939ee9df40160dafe06'; // Keep it in .env
const PARSEUR_MAILBOX_ID = 'modest.honorable.robin@in.parseur.com'; // Your Parseur mailbox

// Route: POST /api/supplierdetails/upload-quotation
// exports.uploadAndCreateSupplierDetails = (req, res) => {
//   upload(req, res, async function (err) {
//     if (err || !req.file) {
//       return res.status(400).json({ message: "PDF file is required." });
//     }

//     // const transaction = await sequelize.transaction();
//     try {
//       // 1. Upload PDF to Parseur
//       const fileStream = fs.createReadStream(req.file.path);
//       const parseurResp = await axios.post(
//         `https://api.parseur.com/v1/mailboxes/${PARSEUR_MAILBOX_ID}/documents/`,
//         fileStream,
//         { headers: {
//             'Authorization': `Token ${PARSEUR_API_KEY}`,
//             'Content-Type': 'application/pdf'
//           } }
//       );
//       console.log(parseurResp);return;
//       const documentId = parseurResp.data.id;

//       // 2. Wait for Parseur processing and fetch result
//       let parsedData = null;
//       let tries = 0;
//       do {
//         await new Promise(r => setTimeout(r, 5000)); // Wait 5s
//         const result = await axios.get(
//           `https://api.parseur.com/v1/documents/${documentId}/parser_results/data.json`,
//           { headers: { 'Authorization': `Token ${PARSEUR_API_KEY}` } }
//         );
//         if (result.data.status === "success" && result.data.data) {
//           parsedData = result.data.data;
//         }
//         tries++;
//       } while (!parsedData && tries < 6); // Wait up to 30s

//       fs.unlinkSync(req.file.path);

//       if (!parsedData) {
//         await transaction.rollback();
//         return res.status(202).json({ message: "File received, still processing. Try again soon." });
//       }

//       return res.status(201).json({
//         code: "CREATE_SUCCESS",
//         status: 201,
//         message: "Supplier Quotation Details created successfully",
//         data: supplierDetails
//       });
//       // 3. Map Parseur data -> SupplierDetails fields
//       // CHANGE FIELDMAPPINGS TO MATCH YOUR PARSEUR OUTPUT
//       const supplierObj = {
//         quotation_req_id: parsedData.quotation_req_id,
//         vendor_id: parsedData.vendor_id,
//         quotation_no: parsedData.quotation_no,
//         quotation_date: parsedData.quotation_date,
//         delivery_date: parsedData.delivery_date,
//         payment_days: parsedData.payment_days,
//         supplier_status: parsedData.supplier_status,
//         quotation_comparision_approval: parsedData.quotation_comparision_approval,
//         delivery_priode: parsedData.delivery_priode,
//         ex_delivery: parsedData.ex_delivery,
//         discount: parsedData.discount,
//         amount: parsedData.amount,
//         payment_terms: parsedData.payment_terms,
//         user_id: parsedData.user_id,
//         branch_id: parsedData.branch_id,
//         company_id: parsedData.company_id
//       };

//       // 4. Create SupplierDetails main record
//       const supplierDetails = await SupplierDetails.create(supplierObj, { transaction });

//       // 5. Insert line items
//       if (Array.isArray(parsedData.items) && parsedData.items.length > 0) {
//         for (const item of parsedData.items) {
//           await QuotationComparisonTrnReq.create({
//             ...item,
//             supplier_details_id: supplierDetails.id, // Link to SupplierDetails
//             user_id: supplierObj.user_id,
//             branch_id: supplierObj.branch_id,
//             company_id: supplierObj.company_id
//           }, { transaction });
//         }
//       }

//       await transaction.commit();

//       return res.status(201).json({
//         code: "CREATE_SUCCESS",
//         status: 201,
//         message: "Supplier Quotation Details created successfully",
//         data: supplierDetails
//       });

//     } catch (error) {
//       await transaction.rollback();
//       if (req.file && req.file.path) try { fs.unlinkSync(req.file.path); } catch (_) {}
//       return res.status(500).json({ message: "PDF parse/push error", error: error.message });
//     }
//   });
// };
exports.uploadAndCreateSupplierDetails = (req, res) => {
  upload(req, res, async function (err) {
    if (err || !req.file) {
      return res.status(400).json({ message: "PDF file is required." });
    }

    try {
      // 1. Upload PDF to Parseur
      const fileStream = fs.createReadStream(req.file.path);

      const parseurResp = await axios.post(
        `https://api.parseur.com/v1/mailboxes/${PARSEUR_MAILBOX_ID}/documents/`,
        fileStream,
        {
          headers: {
            'Authorization': `Token ${PARSEUR_API_KEY}`,
            'Content-Type': 'application/pdf'
          }
        }
      );
console.log(parseurResp);
      // Immediately delete local file to avoid buildup
      // fs.unlinkSync(req.file.path);

      // Extract document id
      const documentId = parseurResp.data.id || null;

      // 2. Poll Parseur for parsed data (max 30 seconds, 5s intervals)
      let parsedData = null;
      let tries = 0;
      while (!parsedData && tries < 6) {
        await new Promise(r => setTimeout(r, 5000)); // wait 5s

        const result = await axios.get(
          `https://api.parseur.com/v1/documents/${documentId}/parser_results/data.json`,
          {
            headers: { 'Authorization': `Token ${PARSEUR_API_KEY}` }
          }
        );

        if (result.data.status === "success" && result.data.data) {
          parsedData = result.data.data;
          break;
        }
        tries++;
      }

      if (!parsedData) {
        return res.status(202).json({
          message: "File received, still processing. Try again soon.",
          documentId
        });
      }

      // 3. Return all response data without saving to DB
      return res.status(200).json({
        message: "Parseur PDF processing successful",
        parseurUploadResponse: parseurResp.data,
        documentId,
        parsedData
      });

    } catch (error) {
      // if (req.file && req.file.path) {
      //   try { fs.unlinkSync(req.file.path); } catch (_) {}
      // }
      return res.status(500).json({
        message: "PDF parse error",
        error: error.message
      });
    }
  });
};