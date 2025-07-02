module.exports = (sequelize, DataTypes) => {
  const InquiryTransaction = sequelize.define("InquiryTransaction", {
    inquiry_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_unit_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_base_unit_id: { type: DataTypes.INTEGER, allowNull: false },
    product_base_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    product_convert_unit_id: { type: DataTypes.INTEGER, allowNull: false },
    product_convert_quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    rate: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    convert_rate: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    specification: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "inquiry_transactions",
    timestamps: true,
    underscored: true
  });

  return InquiryTransaction;
};
