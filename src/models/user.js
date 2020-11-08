import Sequelize from 'sequelize';

export default function (sequelize, DataTypes) {
  class User extends Sequelize.Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING
      },
      sign: {
        type: DataTypes.STRING
      },
      sex: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      paranoid: true,
      timestamps: true
    }
  );
  return User;
}
