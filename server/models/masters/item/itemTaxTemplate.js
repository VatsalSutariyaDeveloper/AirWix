module.exports = (sequelize, DataTypes) => {
  const ItemTaxTemplate = sequelize.define('ItemTaxTemplate', {
    tax_name: { type: DataTypes.STRING, allowNull: false },
    gst_treatment: {
      type: DataTypes.ENUM('Taxable', 'Nil-Rated', 'Exempted', 'Non-GST'),
      allowNull: false
    },
    gst_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    cgst: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    sgst: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    igst: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted'
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'item_tax_templates',
    timestamps: true,
    underscored: true
  });

  return ItemTaxTemplate;
};
