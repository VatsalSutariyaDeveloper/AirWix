// Sequelize model for Product Category Master
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define("ProductCategory", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_type_id: { type: DataTypes.INTEGER, allowNull: false },
    category_name: { type: DataTypes.STRING, allowNull: false },
    parent_category_id: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0 = active, 1 = inactive, 2 = deleted
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "product_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ProductCategory;
};
