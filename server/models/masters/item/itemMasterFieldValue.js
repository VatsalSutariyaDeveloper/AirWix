module.exports = (sequelize, DataTypes) => {
  const ItemMasterFieldValue = sequelize.define('ItemMasterFieldValue', {
    item_field_id: { type: DataTypes.INTEGER, allowNull: false },
    field_value_name: { type: DataTypes.STRING, allowNull: false },
    priority: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted'
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'item_master_field_values',
    timestamps: true,
    underscored: true
  });

  return ItemMasterFieldValue;
};
