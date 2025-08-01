const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Administration models
const MenuMaster = require("./administration/menuMaster")(sequelize, DataTypes);
const MenuMasterAccess = require("./administration/menuMasterAccess")(sequelize, DataTypes);
const MenuMasterAccessRoute = require("./administration/menuMasterAccessRoute")(sequelize, DataTypes);
const TemplateAccessPermission = require("./administration/templateAccessPermission")(sequelize, DataTypes);
const Permission = require("./administration/permission")(sequelize, DataTypes);
const PrintTypeMaster = require("./administration/printTypeMaster")(sequelize, DataTypes);
const PrintMaster = require("./administration/printMaster")(sequelize, DataTypes);
const PrintPermission = require("./administration/printPermission")(sequelize, DataTypes);

// CRM models
const InquiryTypeMaster = require("./crm/inquiry/inquiryTypeMaster")(sequelize, DataTypes);
const Inquiry = require("./crm/inquiry/inquiry")(sequelize, DataTypes);
const InquiryTransaction = require("./crm/inquiry/inquiryTransaction")(sequelize, DataTypes);
const InquiryAttachment = require("./crm/inquiry/inquiryAttachment")(sequelize, DataTypes);
const InquiryNote = require("./crm/inquiry/inquiryNote")(sequelize, DataTypes);
const Appointment = require("./crm/inquiry/appointment")(sequelize, DataTypes);
const followUp = require("./crm/inquiry/followUp")(sequelize, DataTypes);

const SalesOrder = require("./crm/sales-order/salesOrder")(sequelize, DataTypes);
const SalesOrderTransaction = require("./crm/sales-order/salesOrderTransaction")(sequelize, DataTypes);
const SalesOrderTermsTransaction = require("./crm/sales-order/salesOrderTermsTransaction")(sequelize, DataTypes);
const SalesOrderAttachment = require("./crm/sales-order/salesOrderAttachment")(sequelize, DataTypes);
const SalesOrderDeliveryDate = require("./crm/sales-order/salesOrderDeliveryDate")(sequelize, DataTypes);
const SalesOrderApproveLog = require("./crm/sales-order/salesOrderApproveLog")(sequelize, DataTypes);
const OrderAcceptanceApproveLog = require("./crm/sales-order/orderAcceptanceApproveLog")(sequelize, DataTypes);
const WorkOrderReservTemp = require("./crm/sales-order/workOrderReservTemp")(sequelize, DataTypes);
const SalesOrderProductionTransaction = require("./crm/sales-order/salesOrderProductionTransaction")(sequelize, DataTypes);
const ProformaInvoice = require("./crm/sales-order/proformaInvoice")(sequelize, DataTypes);

const Quotation = require("./crm/quotation/quotation")(sequelize, DataTypes);
const QuotationTransaction = require("./crm/quotation/quotationTransaction")(sequelize, DataTypes);
const QuotationTermsTransaction = require("./crm/quotation/quotationTermsTransaction")(sequelize, DataTypes);
const QuotationAttachment = require("./crm/quotation/quotationAttachment")(sequelize, DataTypes);
const QuotationApproveLog = require("./crm/quotation/quotationApproveLog")(sequelize, DataTypes);

// Inventory models
const StockTransaction = require("./inventory/stockTransaction")(sequelize, DataTypes);
const ReserveStock = require("./inventory/reserveStock")(sequelize, DataTypes);
const StockGeneral = require("./inventory/stockGeneral")(sequelize, DataTypes);
const StockGeneralTransaction = require("./inventory/stockGeneralTransaction")(sequelize, DataTypes);
const BatchStockIn = require("./inventory/batchStockIn")(sequelize, DataTypes);
const StockGeneralApprovalLog = require("./inventory/stockGeneralApprovalLog")(sequelize, DataTypes);

// Inventory models
const Invoice = require("./finance/invoice")(sequelize, DataTypes);
const InvoiceTransaction = require("./finance/invoiceTransaction")(sequelize, DataTypes);

// Masters models
const ProductCategory = require("./masters/item/productCategory")(sequelize, DataTypes);
const ItemTaxTemplate = require("./masters/item/itemTaxTemplate")(sequelize, DataTypes);
const ItemTaxTemplateTransaction = require("./masters/item/itemTaxTemplateTransaction")(sequelize, DataTypes);
const HSNMaster = require("./masters/item/hsnMaster")(sequelize, DataTypes);
const HSNMasterTransaction = require("./masters/item/HSNMasterTransaction")(sequelize, DataTypes);
const ItemMasterFieldValue = require("./masters/item/itemMasterFieldValue")(sequelize, DataTypes);
const ItemMasterFieldName = require("./masters/item/itemMasterFieldName")(sequelize, DataTypes);
const ProductUnitMaster = require("./masters/item/productUnitMaster")(sequelize, DataTypes);
const ItemMaster = require("./masters/item/itemMaster")(sequelize, DataTypes);
const ProductProcess = require("./masters/item/productProcess")(sequelize, DataTypes);

const BranchMaster = require("./masters/branchMaster")(sequelize, DataTypes);
const BankMaster = require("./masters/bankMaster")(sequelize, DataTypes);
const CompanyMaster = require("./masters/companyMaster")(sequelize, DataTypes);
const CityMaster = require("./masters/cityMaster")(sequelize, DataTypes);
const StateMaster = require("./masters/stateMaster")(sequelize, DataTypes);
const CountryMaster = require("./masters/countryMaster")(sequelize, DataTypes);
const ZoneMaster = require("./masters/zoneMaster")(sequelize, DataTypes);
const DrawingMaster = require("./masters/drawingMaster")(sequelize, DataTypes);
const DrawingTransaction = require("./masters/drawingTransaction")(sequelize, DataTypes);
const UserTypeMaster = require("./masters/userTypeMaster")(sequelize, DataTypes);
const LedgerMaster = require("./masters/ledgerMaster")(sequelize, DataTypes);
const LedgerDocument = require("./masters/ledgerDocument")(sequelize, DataTypes);
const LedgerGroup = require("./masters/ledgerGroup")(sequelize, DataTypes);
const BusinessTypeMaster = require("./masters/businessTypeMaster")(sequelize, DataTypes);
const ModuleMaster = require("./masters/moduleMaster")(sequelize, DataTypes);
const SeriesTypeMaster = require("./masters/seriesTypeMaster")(sequelize, DataTypes);
const DocumentMaster = require("./masters/documentMaster")(sequelize, DataTypes);
const CommonCategoryMaster = require("./masters/commonCategoryMaster")(sequelize, DataTypes);
const CommonMaster = require("./masters/commonMaster")(sequelize, DataTypes);
const CurrencyMaster = require("./masters/currencyMaster")(sequelize, DataTypes);
const PaymentTermsMaster = require("./masters/paymentTermsMaster")(sequelize, DataTypes);
const TranspotationMaster = require("./masters/transpotationMaster")(sequelize, DataTypes);
const GodownMaster = require("./masters/godownMaster")(sequelize, DataTypes);
const ProcessTypeMaster = require("./masters/processTypeMaster")(sequelize, DataTypes);
const ProcessListMaster = require("./masters/processListMaster")(sequelize, DataTypes);
const QcParameterMaster = require("./masters/qcParameterMaster")(sequelize, DataTypes);
const GstTypeMaster = require("./masters/gstTypeMaster")(sequelize, DataTypes);
const ProductSpecificationMaster = require("./masters/productSpecificationMaster")(sequelize, DataTypes);
const ProductSpecificationValueMaster = require("./masters/productSpecificationValueMaster")(sequelize, DataTypes);
const ProductTypeMaster = require("./masters/productTypeMaster")(sequelize, DataTypes);
const ProductSeriesMaster = require("./masters/productSeriesMaster")(sequelize, DataTypes);

// Production models
const ProductBomVersion = require("./production/bom/productBomVersion")(sequelize, DataTypes);
const BOM = require("./production/bom/bom")(sequelize, DataTypes);
const BOMTransaction = require("./production/bom/bomTransaction")(sequelize, DataTypes);
const BOMProductProcess = require("./production/bom/bomProductProcess")(sequelize, DataTypes);

// Purchase models
const IndentApproval = require("./purchase/indentApproval")(sequelize, DataTypes);
const PurchaseQuotation = require("./purchase/quotation")(sequelize, DataTypes);
const PurchaseQuotationRef = require("./purchase/quotationRef")(sequelize, DataTypes);
const QuotationTransactionRef = require("./purchase/quotationTransactionRef")(sequelize, DataTypes);
const SupplierQuotationDetails = require("./purchase/supplierQuotationDetails")(sequelize, DataTypes);
const Indent = require("./purchase/indent")(sequelize, DataTypes);
const IndentTransaction = require("./purchase/indentTransaction")(sequelize, DataTypes);
const QuotationComparisonRequest = require("./purchase/quotation-comparison/request")(sequelize, DataTypes);
const QuotationComparisonTrnReq = require("./purchase/quotation-comparison/requestTransaction")(sequelize, DataTypes);
const QuotationComparison = require("./purchase/quotation-comparison/quotationComparison")(sequelize, DataTypes);
const QCSupplierDetails = require("./purchase/quotation-comparison/supplierDetails")(sequelize, DataTypes);

// Transaction models
const BillSundryTransaction = require("./transactions/billSundryTransaction")(sequelize, DataTypes);
const TaxTransaction = require("./transactions/taxTransaction")(sequelize, DataTypes);

// Collect all models in one db object
const db = {
  // Administration
  MenuMaster,
  MenuMasterAccess,
  MenuMasterAccessRoute,
  TemplateAccessPermission,
  Permission,
  PrintTypeMaster,
  PrintMaster,
  PrintPermission,

  // CRM
  InquiryTypeMaster,
  Inquiry,
  InquiryTransaction,
  InquiryAttachment,
  InquiryNote,
  Appointment,
  followUp,
  SalesOrder,
  SalesOrderTransaction,
  SalesOrderTermsTransaction,
  SalesOrderAttachment,
  SalesOrderDeliveryDate,
  SalesOrderApproveLog,
  OrderAcceptanceApproveLog,
  WorkOrderReservTemp,
  SalesOrderProductionTransaction,
  ProformaInvoice,
  Quotation,
  QuotationTransaction,
  QuotationTermsTransaction,
  QuotationAttachment,
  QuotationApproveLog,

  // Inventory
  StockTransaction,
  ReserveStock,
  StockGeneral,
  StockGeneralTransaction,
  BatchStockIn,
  StockGeneralApprovalLog,

  // Inventory
  Invoice,
  InvoiceTransaction,

  // Masters
  ProductCategory,
  ItemTaxTemplate,
  ItemTaxTemplateTransaction,
  HSNMaster,
  HSNMasterTransaction,
  ItemMasterFieldValue,
  ItemMasterFieldName,
  ProductUnitMaster,
  ItemMaster,
  ProductProcess,
  BranchMaster,
  BankMaster,
  CompanyMaster,
  CityMaster,
  StateMaster,
  CountryMaster,
  ZoneMaster,
  DrawingMaster,
  DrawingTransaction,
  UserTypeMaster,
  LedgerMaster,
  LedgerDocument,
  LedgerGroup,
  BusinessTypeMaster,
  ModuleMaster,
  SeriesTypeMaster,
  DocumentMaster,
  CommonCategoryMaster,
  CommonMaster,
  CurrencyMaster,
  PaymentTermsMaster,
  TranspotationMaster,
  GodownMaster,
  ProcessTypeMaster,
  ProcessListMaster,
  QcParameterMaster,
  GstTypeMaster,
  ProductSpecificationMaster,
  ProductSpecificationValueMaster,
  ProductTypeMaster,
  ProductSeriesMaster,

  // Production
  ProductBomVersion,
  BOM,
  BOMTransaction,
  BOMProductProcess,

  // Purchase
  IndentApproval,
  PurchaseQuotation,
  PurchaseQuotationRef,
  QuotationTransactionRef,
  SupplierQuotationDetails,
  Indent,
  IndentTransaction,
  QuotationComparisonRequest,
  QuotationComparisonTrnReq,
  QuotationComparison,
  QCSupplierDetails,

  // Transactions
  BillSundryTransaction,
  TaxTransaction,
};

// Apply associations (IMPORTANT)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // pass all models
  }
});

// Export Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = require("sequelize");

module.exports = db;