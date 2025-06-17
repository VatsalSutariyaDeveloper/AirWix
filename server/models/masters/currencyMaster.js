module.exports = (sequelize, DataTypes) => {
  const CurrencyMaster = sequelize.define("CurrencyMaster", {
    currency_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    currency_code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    currency_rate: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false
    },
    currency_symbol: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "currency_master",
    timestamps: true,
    underscored: true
  });

  return CurrencyMaster;
};
