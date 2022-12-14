import { DataTypes } from 'sequelize';

import { sequelize } from '../db';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: false });

const Theme = sequelize.define('themes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  theme: { type: DataTypes.INTEGER },
}, { timestamps: false });

export { User, Theme };
