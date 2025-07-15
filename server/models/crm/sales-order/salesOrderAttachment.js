module.exports = (sequelize, DataTypes) => {
  const SalesOrderAttachment = sequelize.define("SalesOrderAttachment", {
    sales_order_id: { type: DataTypes.INTEGER },
    design_department: { type: DataTypes.TINYINT }, // 0:No / 1:Yes
    attachment_name: { type: DataTypes.STRING(100) },
    attachment_file: { type: DataTypes.STRING(255) },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "sales_order_attachment",
    timestamps: true,
    underscored: true
  });

  return SalesOrderAttachment;
};
