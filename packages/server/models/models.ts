import { DataTypes } from 'sequelize';

import { sequelize } from '../db';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // todo сделть false, когда фронт будет отправлять пользователя при авторизации
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  second_name: { type: DataTypes.STRING },
  display_name: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING, unique: true },
  avatar: { type: DataTypes.STRING },
});

const Topic = sequelize.define('topic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  // authorId: { type: DataTypes.INTEGER },
});

User.hasMany(Topic);
Topic.belongsTo(User);

export { User, Topic };
