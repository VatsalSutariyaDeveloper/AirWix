const { BillSundryTransaction,TaxTransaction, SeriesTypeMaster } = require("../../models");
const validateRequest = require("../validateRequest");
const commonQuery = require("../commonQuery");
const { ItemMaster } = require('../../models');

exports.getProductDetail = (product_id, transaction = null) => {
  if (!product_id) return Promise.resolve(null);

  return commonQuery.findOneById(ItemMaster, product_id, transaction)
    .then(product => product || null)
    .catch(err => {
      console.error(`Error fetching product with ID ${product_id}:`, err);
      return null;
    });
};


exports.fixDecimals = (value, digits = 5) => {
  if (isNaN(value)) return "0." + "0".repeat(digits);
  const factor = Math.pow(10, digits);
  return (Math.ceil(Number(value) * factor) / factor).toFixed(digits);
};

exports.formatDateTime = (dateInput, format = "DD-MM-YYYY") => {
  const date = new Date(dateInput);
  if (isNaN(date)) return "";

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const map = {
    D: day,
    DD: String(day).padStart(2, "0"),
    M: getMonthNameFull(monthIndex),      
    MM: String(monthIndex + 1).padStart(2, "0"),
    MMM: getMonthNameShort(monthIndex),     
    YYYY: year,
    YY: String(year).slice(-2),
    H: date.getHours(),
    HH: String(date.getHours()).padStart(2, "0"),
    m: date.getMinutes(),
    mm: String(date.getMinutes()).padStart(2, "0"),
    s: date.getSeconds(),
    ss: String(date.getSeconds()).padStart(2, "0"),
  };

  return format.replace(
    /YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|mm|m|ss|s/g,
    match => map[match]
  );

  // console.log(formatDateTime(date, "D M YYYY"));      // 28 July 2025
  // console.log(formatDateTime(date, "DD-MM-YYYY"));    // 28-07-2025
  // console.log(formatDateTime(date, "MMM D, YY"));     // Jul 28, 25
  // console.log(formatDateTime(date, "YYYY/MM/DD"));    // 2025/07/28
  // console.log(formatDateTime(date, "HH:mm:ss"));      // 16:53:45
}

function getMonthNameShort(index) {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index];
}

function getMonthNameFull(index) {
  return ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"][index];
}

exports.generateSeriesNumber = async (typeId, companyId, transaction) => {
  const rows = await commonQuery.findAllRecords(
    SeriesTypeMaster,
    {
      id: typeId,
      company_id: companyId,
      status: 0,
    },
    transaction
  );

  const typeRow = rows?.[0]; // get the first record

  if (!typeRow) {
    throw new Error("Invalid Series type ID or Company ID");
  }

  const id = parseInt(typeRow.start_series || 0, 10) + 1;

  let seriesno = "";
  switch (typeRow.series_format) {
    case 2:
      seriesno = `${padNumber(id, 4)}${typeRow.format_value}`;
      break;
    case 1:
      seriesno = `${typeRow.format_value}${padNumber(id, 3)}`;
      break;
    case 3:
      seriesno = `${typeRow.format_value}${padNumber(id, 3)}${typeRow.end_format_value}`;
      break;
    default:
      seriesno = padNumber(id, 3);
      break;
  }

  return seriesno;
};

exports.updateSeriesNumber = async (typeId, companyId, transaction = null) => {
  try {
    const rows = await commonQuery.findAllRecords(
      SeriesTypeMaster,
      {
        id: typeId,
        company_id: companyId,
        status: 0,
      },
      transaction
    );

    const seriesType = rows?.[0];

    if (!seriesType) {
      throw new Error("Series type not found");
    }

    await SeriesTypeMaster.update(
      { start_series: parseInt(seriesType.start_series || 0, 10) + 1 },
      {
        where: {
          id: typeId,
          company_id: companyId,
        },
        transaction,
      }
    );

    return true;
  } catch (err) {
    console.error("Error updating series number:", err);
    throw err;
  }
};

// Helper
function padNumber(num, width = 3, char = '0') {
  return String(num).padStart(width, char);
}
