
module.exports = (sequelize, DataTypes) => {
  const SourceMaster = sequelize.define('SourceMaster', {
    source_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0, // 0: Active, 1: Inactive, 2: Deleted
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
    tableName: 'source_master',
    timestamps: true,
    underscored: true
  });

  return SourceMaster;
};
