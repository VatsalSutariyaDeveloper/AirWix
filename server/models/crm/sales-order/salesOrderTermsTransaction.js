module.exports = (sequelize, DataTypes) => {
  const SalesOrderTermsTransaction = sequelize.define("SalesOrderTermsTransaction", {
    sales_order_id: { type: DataTypes.INTEGER },
    terms_id: { type: DataTypes.INTEGER },
    ref_terms_id: { type: DataTypes.INTEGER },
    terms_detail: { type: DataTypes.TEXT },
    terms_priority: { type: DataTypes.INTEGER },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "sales_order_terms_transaction",
    timestamps: true,
    underscored: true
  });

  return SalesOrderTermsTransaction;
};
