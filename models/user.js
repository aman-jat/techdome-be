const { DataTypes, Model } = require('sequelize');
const sequelize = require('../src/lib/sequelize');

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    salt: {
      required: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    scopes: {
      user(value) {
        return { where: { id: value } };
      },
    },
  }
);

module.exports = User;
