const { DataTypes, Model } = require('sequelize');
const sequelize = require('../src/lib/sequelize');
const { ROLE } = require('../src/lib/constants');

class Member extends Model {}

Member.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name must be a string');
          }
        },
      },
    },
    email: {
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      neverUpdate: true,
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      },
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM(ROLE.LENDER, ROLE.BORROWER),
      defaultValue: ROLE.BORROWER, // Set default value
    },
  },
  {
    sequelize,
    modelName: 'Member',
    underscored: false,
    tableName: 'Members',
    scopes: {
      member(value) {
        return { where: { id: value } };
      },
    },
  }
);

// Member.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     onDelete: 'CASCADE', // Cascade deletion
//   },
// });

module.exports = Member;
