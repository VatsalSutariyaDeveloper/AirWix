module.exports = (sequelize, DataTypes) => {
  const IndentApproval = sequelize.define("IndentApproval", {
    approval_no: { type: DataTypes.STRING(100), allowNull: false },
    approval_date: { type: DataTypes.DATEONLY, allowNull: false },
    rp_id: { type: DataTypes.INTEGER, allowNull: false },
    approve_unit: { type: DataTypes.STRING(100), allowNull: false },
    approve_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_base_unit: { type: DataTypes.STRING(100), allowNull: false },
    product_base_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_convert_unit: { type: DataTypes.STRING(100), allowNull: false },
    product_convert_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_description: { type: DataTypes.TEXT, allowNull: true },
    delivery_date: { type: DataTypes.DATEONLY, allowNull: false },
    quotation_requirement: { type: DataTypes.STRING(3), allowNull: true }, // Yes / No
    used_document: { type: DataTypes.STRING(100), allowNull: true },
    purchase_quotation_ref_id: { type: DataTypes.INTEGER, allowNull: true },
    purchase_quotation_approval_status: { type: DataTypes.STRING(10), allowNull: true },
    purchase_quotation_approval_id: { type: DataTypes.INTEGER, allowNull: true },
    approval_indent_status: { type: DataTypes.STRING(20), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "indent_approval",
    timestamps: true,
    underscored: true
  });

  return IndentApproval;
};
