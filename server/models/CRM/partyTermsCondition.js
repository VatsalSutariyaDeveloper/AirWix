

module.exports = (sequelize, DataTypes) => {
  const PartyTermsCondition = sequelize.define('PartyTermsCondition', {
    terms_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    print_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    terms_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    for_type: { // Domestic / Export
      type: DataTypes.ENUM('Domestic', 'Export'),
      allowNull: false
    },
    allow_to_change: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0
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
    tableName: 'party_terms_condition_master',
    timestamps: true,
    underscored: true
  });

  return PartyTermsCondition;
};
