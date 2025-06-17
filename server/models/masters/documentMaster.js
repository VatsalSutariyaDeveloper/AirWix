module.exports = (sequelize, DataTypes) => {
  const DocumentMaster = sequelize.define("DocumentMaster", {
    document_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "document_master",
    timestamps: true,
    underscored: true,
  });

  return DocumentMaster;
};
