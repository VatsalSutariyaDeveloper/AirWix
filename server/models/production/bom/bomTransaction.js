module.exports = (sequelize, DataTypes) => {
  const BOMTransaction = sequelize.define("BOMTransaction", {
    bom_id: { type: DataTypes.INTEGER },
    bom_version_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    parent_bom_id: { type: DataTypes.INTEGER },
    parent_bom_version_id: { type: DataTypes.INTEGER },
    product_base_quantity: { type: DataTypes.DECIMAL(12, 3) },
    product_base_unit: { type: DataTypes.STRING(50) },
    product_conversion_unit: { type: DataTypes.STRING(50) },
    product_conversion_quantity: { type: DataTypes.DECIMAL(12, 3) },
    bom_transaction_status: {
      type: DataTypes.TINYINT,
      comment: "0 = Active, 1 = Inactive, 2 = Pending"
    },
    po_request_status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = Pending, 1 = Sent"
    },
    po_visible_status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = Visible, 1 = Invisible"
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "bom_transaction",
    timestamps: true,
    underscored: true
  });

  return BOMTransaction;
};
