module.exports = (sequelize, DataTypes) => {
  const GstTypeMaster = sequelize.define("GstTypeMaster", {
    gst_title: { type: DataTypes.STRING(100), allowNull: false },
    gst_tax: { type: DataTypes.DECIMAL(15,5), allowNull: false },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "gst_type_master",
    timestamps: true,
    underscored: true
  });

  return GstTypeMaster;
};
