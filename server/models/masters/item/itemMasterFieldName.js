module.exports = (sequelize, DataTypes) => {
  const ItemMasterFieldName = sequelize.define("ItemMasterFieldName", {
    item_field_name: { type: DataTypes.STRING(100), allowNull: false },
    db_field_name: { type: DataTypes.STRING(100), allowNull: false },
    field_type: { type: DataTypes.STRING(50), allowNull: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = active, 1 = inactive, 2 = deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "item_master_field_name",
    timestamps: true,
    underscored: true
  });

  return ItemMasterFieldName;
};
