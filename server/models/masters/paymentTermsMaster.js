module.exports = (sequelize, DataTypes) => {
  const PaymentTermsMaster = sequelize.define("PaymentTermsMaster", {
    terms_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    payment_day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: "payment_terms_master",
    timestamps: true,
    underscored: true
  });

  return PaymentTermsMaster;
};
