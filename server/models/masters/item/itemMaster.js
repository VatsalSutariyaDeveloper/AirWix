module.exports = (sequelize, DataTypes) => {
  const ItemMaster = sequelize.define("ItemMaster", {
    item_type_id: { type: DataTypes.INTEGER, allowNull: true },
    item_category_id: { type: DataTypes.INTEGER, allowNull: true },
    hsn_code_id: { type: DataTypes.INTEGER, allowNull: true },
    item_code: { type: DataTypes.STRING, allowNull: false, unique: true },
    item_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    alias_name: { type: DataTypes.STRING, allowNull: true },
    indenting_number: { type: DataTypes.STRING, allowNull: true },
    item_image: { type: DataTypes.STRING, allowNull: true },
    ist_verify: { type: DataTypes.ENUM("Yes", "No"), allowNull: false },
    production_unit: { type: DataTypes.STRING, allowNull: true },
    production_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    purchase_unit: { type: DataTypes.STRING, allowNull: true },
    purchase_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    specification: { type: DataTypes.TEXT, allowNull: true },
status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted'
    },    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "item_master",
    timestamps: true,
    underscored: true
  });
  return ItemMaster;
};