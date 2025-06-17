module.exports = (sequelize, DataTypes) => {
  const CompanyMaster = sequelize.define("CompanyMaster", {
    company_code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    company_name: { type: DataTypes.STRING(100), allowNull: false },
    address: { type: DataTypes.TEXT("medium"), allowNull: true },
    state_id: { type: DataTypes.INTEGER, allowNull: true },
    city_id: { type: DataTypes.INTEGER, allowNull: true },
    country_id: { type: DataTypes.INTEGER, allowNull: true },
    pincode: { type: DataTypes.STRING(10), allowNull: true },
    isd_code: { type: DataTypes.STRING(10), allowNull: true },
    mobile_no: { type: DataTypes.STRING(15), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
    logo_image: { type: DataTypes.STRING(255), allowNull: true },
    website_url: { type: DataTypes.STRING(255), allowNull: true },
    print_header_img: { type: DataTypes.STRING(255), allowNull: true },
    print_footer_img: { type: DataTypes.STRING(255), allowNull: true },
    admin_signature_img: { type: DataTypes.STRING(255), allowNull: true },
    currency_id: { type: DataTypes.INTEGER, allowNull: true },
    gstin: { type: DataTypes.STRING(30), allowNull: true },
    iec_no: { type: DataTypes.STRING(30), allowNull: true },
    lut_no: { type: DataTypes.STRING(30), allowNull: true },
    cin_no: { type: DataTypes.STRING(30), allowNull: true },
    pan_no: { type: DataTypes.STRING(30), allowNull: true },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    branch_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "company_master",
    timestamps: true,
    underscored: true,
  });

  return CompanyMaster;
};
