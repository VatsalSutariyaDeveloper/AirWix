module.exports = (sequelize, DataTypes) => {
  const ItemTaxTemplateTransaction = sequelize.define("ItemTaxTemplateTransaction", {
    tax_template_id: { type: DataTypes.INTEGER, allowNull: false },
    tax_percentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    tax_name: { type: DataTypes.STRING(100), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.STRING, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "item_tax_template_transactions",
    timestamps: true,
    underscored: true
  });

  return ItemTaxTemplateTransaction;
};
