module.exports = (sequelize, DataTypes) => {
  const TerritoryMaster = sequelize.define('TerritoryMaster', {
    parent_territory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    territory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0: Active, 1: Inactive, 2: Deleted',
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
    tableName: 'territory_master',
    timestamps: true,         
    underscored: true,         
  });

  return TerritoryMaster;
};
