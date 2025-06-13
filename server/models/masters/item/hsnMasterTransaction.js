module.exports = (sequelize, DataTypes) => {
  const HSNMasterTransaction = sequelize.define('HSNMasterTransaction', {
    hsn_id: { type: DataTypes.INTEGER, allowNull: false },
    item_tax_template_id: { type: DataTypes.INTEGER, allowNull: false },
    tax_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted'
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'hsn_master_transactions',
    timestamps: true,
    underscored: true
  });

  return HSNMasterTransaction;
};
