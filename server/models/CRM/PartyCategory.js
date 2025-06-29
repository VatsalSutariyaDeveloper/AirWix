
module.exports = (sequelize, DataTypes) => {
  const PartyCategory = sequelize.define("PartyCategory", {
    party_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0 = Active, 1 = Inactive, 2 = Deleted
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
    tableName: 'party_category',
    timestamps: true,
    underscored: true,
  });

  return PartyCategory;
};