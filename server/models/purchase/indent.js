module.exports = (sequelize, DataTypes) => {
  const Indent = sequelize.define("Indent", {
    series_id: { type: DataTypes.INTEGER, allowNull: false },
    indent_no: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    indent_date: { type: DataTypes.DATEONLY, allowNull: false },
    remark: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 2: Inactive, 3: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "indent",
    timestamps: true,
    underscored: true
  });

  return Indent;
};
