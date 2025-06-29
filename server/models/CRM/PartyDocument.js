module.exports = (sequelize, DataTypes) => {
  const PartyDocument = sequelize.define("PartyDocument", {
    document_name: { type: DataTypes.STRING, allowNull: false },
    document_file: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    user_id: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {
    tableName: "party_documents",
    timestamps: true,
    underscored: true
  });

  return PartyDocument;
};
