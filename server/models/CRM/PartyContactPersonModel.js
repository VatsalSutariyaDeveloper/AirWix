module.exports = (sequelize, DataTypes) => {
  const PartyContactPerson = sequelize.define("PartyContactPerson", {
    party_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isd_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: '0 = Active, 1 = Inactive, 2 = Deleted'
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
    tableName: "party_contact_person_details",
    timestamps: true,
    underscored: true
  });

  return PartyContactPerson;
};
