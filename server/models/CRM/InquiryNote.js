// models/InquiryNote.js

module.exports = (sequelize, DataTypes) => {
  const InquiryNote = sequelize.define("InquiryNote", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    inquiry_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0 = Active
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: "inquiry_note",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  return InquiryNote;
};
