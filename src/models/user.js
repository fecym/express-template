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
        type: DataTypes.STRING(32),
        allowNull: false
      },
      loginName: {
        type: DataTypes.STRING(16),
        field: 'login_name',
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(8),
        defaultValue: '0'
      },
      avatar: {
        type: DataTypes.STRING(50)
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
