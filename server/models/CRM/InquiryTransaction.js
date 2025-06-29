module.exports = (sequelize, DataTypes) => {
  const InquiryTransaction = sequelize.define("InquiryTransaction", {
    inquiry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    product_base_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_base_quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    product_convert_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_convert_quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    convert_rate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specification: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    user_id: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
  }, {
    tableName: "inquiry_transaction",
    timestamps: true,
    underscored: true,
  });

  return InquiryTransaction;
};
