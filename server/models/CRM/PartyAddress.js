module.exports = (sequelize, DataTypes) => {
  const PartyAddress = sequelize.define('PartyAddress', {
    party_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    is_default: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0 = No, 1 = Yes
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0 = active, 1 = inactive, 2 = deleted
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
    }
  }, {
    tableName: 'party_address_details',
    timestamps: true,
    underscored: true,
  });

  return PartyAddress;
};
