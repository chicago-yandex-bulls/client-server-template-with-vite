import { DataTypes } from 'sequelize';

import { sequelize } from '../db';

const Comment = sequelize.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: { type: DataTypes.STRING },
  authorId: { type: DataTypes.INTEGER },
});

const Topic = sequelize.define('topic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  content: { type: DataTypes.STRING(1000), allowNull: false },
  authorId: { type: DataTypes.INTEGER },
});

Topic.hasMany(Comment);

Comment.belongsTo(Topic);

export { Comment, Topic };
