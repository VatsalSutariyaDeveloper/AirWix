module.exports = (sequelize, DataTypes) => {
  const InvoiceTransaction = sequelize.define(
    "InvoiceTransaction",
    {
      invoice_id: { type: DataTypes.INTEGER },
      product_id: { type: DataTypes.INTEGER },
      product_description: { type: DataTypes.TEXT("long") },
      product_specification: { type: DataTypes.TEXT("long") },
      prodct_unit: { type: DataTypes.INTEGER, defaultValue: 0 },
      product_qty: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      prodct_base_unit: { type: DataTypes.INTEGER, defaultValue: 0 },
      product_base_qty: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      product_convert_unit: { type: DataTypes.INTEGER, defaultValue: 0 },
      product_convert_qty: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      product_discount: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      discount_per: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      formulaid: { type: DataTypes.INTEGER, defaultValue: 0 },
      product_amount: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      product_conv_amount: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      product_total_amount: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      product_conv_total_amount: { type: DataTypes.DOUBLE(15, 5), defaultValue: 0 },
      ref_module_id: { type: DataTypes.INTEGER, defaultValue: 0 },
      ref_id: { type: DataTypes.INTEGER, defaultValue: 0 },
      user_id: { type: DataTypes.INTEGER },
      branch_id: { type: DataTypes.INTEGER },
      company_id: { type: DataTypes.INTEGER },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: "0 = active, 1 = inactive, 2 = deleted",
      },
    },
    {
      tableName: "invoice_transaction",
      timestamps: false,
      underscored: true,
    }
  );

  InvoiceTransaction.associate = (models) => {
    InvoiceTransaction.belongsTo(models.Invoice, {
      foreignKey: "invoice_id",
      as: "invoice",
    });
  };

  return InvoiceTransaction;
};
