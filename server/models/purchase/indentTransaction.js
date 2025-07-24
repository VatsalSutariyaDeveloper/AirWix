module.exports = (sequelize, DataTypes) => {
  const IndentTransaction = sequelize.define("IndentTransaction", {
    indent_id: { type: DataTypes.INTEGER, allowNull: false },
    sales_order_id: { type: DataTypes.INTEGER, allowNull: true },
    work_order_id: { type: DataTypes.INTEGER, allowNull: true },
    vendor_id: { type: DataTypes.INTEGER, allowNull: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    unit_id: { type: DataTypes.INTEGER, allowNull: false },
    conversion_unit_id: { type: DataTypes.INTEGER, allowNull: true },
    purchase_card_transaction_id: { type: DataTypes.INTEGER, allowNull: true },
    product_description: { type: DataTypes.TEXT, allowNull: true },
    product_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_conversion_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    attached_document: { type: DataTypes.STRING(255), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 2: Inactive, 3: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "indent_transaction",
    timestamps: true,
    underscored: true
  });

  return IndentTransaction;
};
