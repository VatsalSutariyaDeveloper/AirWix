module.exports = (sequelize, DataTypes) => {
  const taxTransaction = sequelize.define("TaxTransaction",{
      tax_id: { type: DataTypes.INTEGER, allowNull: false },
      module_id: { type: DataTypes.INTEGER, allowNull: false },
      module_transaction_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER },
      currency_id: { type: DataTypes.INTEGER },
      currency_rate: { type: DataTypes.DECIMAL(15, 5) },
      tax_value: { type: DataTypes.DECIMAL(15,5), allowNull: false },
      taxable_value: { type: DataTypes.DECIMAL(15,5) },
      taxable_value_converted: { type: DataTypes.DECIMAL(15,5) },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "0 = Active, 2 = Deleted, 3 = Hold",
      },

      user_id: { type: DataTypes.INTEGER, allowNull: false },
      branch_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "tax_transaction",
      timestamps: true,
      underscored: true,
    }
  );

  return taxTransaction;
};
