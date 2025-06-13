module.exports = (sequelize, DataTypes) => {
  const ProductUnitMaster = sequelize.define("ProductUnitMaster", {
    unit_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gst_code: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Used for e-way bill generation"
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "product_unit_masters",
    timestamps: true,
    underscored: true,
  });

  return ProductUnitMaster;
};
