module.exports = (sequelize, DataTypes) => {
  const ItemMaster = sequelize.define(
    "ItemMaster",
    {
      item_type_id: { type: DataTypes.INTEGER, allowNull: true },
      item_category_id: { type: DataTypes.INTEGER, allowNull: true },
      hsn_code_id: { type: DataTypes.INTEGER, allowNull: true },
      item_code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      item_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      alias_name: { type: DataTypes.STRING(150), allowNull: true },
      indenting_number: { type: DataTypes.STRING(100), allowNull: true },
      item_image: { type: DataTypes.STRING(255), allowNull: true },
      ist_verify: { type: DataTypes.ENUM("Yes", "No"), allowNull: false },
      production_unit: { type: DataTypes.STRING(100), allowNull: true },
      production_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      purchase_unit: { type: DataTypes.STRING(100), allowNull: true },
      purchase_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      rate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      specification: { type: DataTypes.TEXT, allowNull: true },
      batch_wise_stock_manage: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: "0 = active, 1 = inactive, 2 = deleted",
      },
      drawing_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      branch_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "item_master",
      timestamps: true,
      underscored: true,
    }
  );

  ItemMaster.associate = (models) => {
    // Category association
    ItemMaster.belongsTo(models.ProductCategory, {
      foreignKey: "item_category_id",
      as: "category",
    });

    // Drawing association
    ItemMaster.belongsTo(models.DrawingMaster, {
      foreignKey: "drawing_id",
      as: "drawing",
    });
  };

  return ItemMaster;
};
