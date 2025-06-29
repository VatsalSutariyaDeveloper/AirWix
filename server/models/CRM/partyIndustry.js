module.exports = (sequelize, DataTypes) => {
  const PartyIndustry = sequelize.define('PartyIndustry', {
    industry_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0: Active, 1: Inactive, 2: Deleted
      comment: "0: Active, 1: Inactive, 2: Deleted"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'party_industry_master',
    timestamps: true,
    underscored: true
  });

  return PartyIndustry;
};
