

module.exports = (sequelize, DataTypes) => {
  const PartyMaster = sequelize.define('PartyMaster', {
    party_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    party_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assign_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    party_industry_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    customer_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    source_refer_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    territory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gst_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iec_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'party_master',
    timestamps: true,
    underscored: true,
  });

  return PartyMaster;
};
