module.exports = (sequelize, DataTypes) => {
  const LedgerDocument = sequelize.define("LedgerDocument", {
    ledger_id: { type: DataTypes.INTEGER, allowNull: false },
    document_name: { type: DataTypes.STRING(100), allowNull: false },
    document_file: { type: DataTypes.STRING(255), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "ledger_document",
    timestamps: true,
    underscored: true,
  });

  return LedgerDocument;
};
