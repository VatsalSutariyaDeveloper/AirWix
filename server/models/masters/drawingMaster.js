module.exports = (sequelize, DataTypes) => {
  const DrawingMaster = sequelize.define("DrawingMaster", {
    drawing_number: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    size: { type: DataTypes.STRING(50), allowNull: false },
    scale: { type: DataTypes.STRING(50), allowNull: false },
    remark: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0 = active, 1 = inactive, 2 = deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "drawing_master",
    timestamps: true,
    underscored: true
  });

  return DrawingMaster;
};
