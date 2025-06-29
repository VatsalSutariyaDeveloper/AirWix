module.exports = (sequelize, DataTypes) => {
  const ItemMasterFieldName = sequelize.define('ItemMasterFieldName', {
    item_field_name: { type: DataTypes.STRING, allowNull: false },
    db_field_name: { type: DataTypes.STRING, allowNull: false },
    field_type: { type: DataTypes.STRING, allowNull: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted'
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'item_master_field_names',
    timestamps: true,
    underscored: true
  });

  return ItemMasterFieldName;
};
