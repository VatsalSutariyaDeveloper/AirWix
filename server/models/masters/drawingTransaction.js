module.exports = (sequelize, DataTypes) => {
  const DrawingTransaction = sequelize.define("DrawingTransaction", {
    drawing_id: { type: DataTypes.INTEGER, allowNull: false },
    drawing_image_name: { type: DataTypes.STRING(255), allowNull: false },
    image_title: { type: DataTypes.STRING(100), allowNull: false },
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
    tableName: "drawing_transaction",
    timestamps: true,
    underscored: true
  });

  return DrawingTransaction;
};
