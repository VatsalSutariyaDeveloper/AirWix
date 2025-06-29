
module.exports = (sequelize, DataTypes) => {
  const Annexure = sequelize.define('Annexure', {
    annexure_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0 = Active, 1 = Inactive, 2 = Deleted
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'annexure',
    timestamps: true,
    underscored: true
  });

  return Annexure;
};
