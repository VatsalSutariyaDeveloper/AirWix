module.exports = (sequelize, DataTypes) => {
  const TranspotationMaster = sequelize.define("TranspotationMaster", {
    transpotation_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    transpotation_branch: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
    mobile_no: { type: DataTypes.STRING(20), allowNull: true },
    gst_no: { type: DataTypes.STRING(20), allowNull: true },
    status: { type: DataTypes.TINYINT, defaultValue: 0, comment: "0: Active, 1: Inactive, 2: Deleted" },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "transpotation_master",
    timestamps: true,
    underscored: true
  });

  return TranspotationMaster;
};
