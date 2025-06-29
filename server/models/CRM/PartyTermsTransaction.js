module.exports = (sequelize, DataTypes) => {
  const PartyTermsTransaction = sequelize.define('PartyTermsTransaction', {
    party_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    terms_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0 = active, 1 = inactive, 2 = deleted
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
    tableName: 'party_terms_transaction',
    timestamps: true,
    underscored: true
  });

  return PartyTermsTransaction;
};
