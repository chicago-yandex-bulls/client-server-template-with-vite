import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({
  path: '../../.env',
});
// раскоментить если дев
//
// export const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
//
// });

// раскоментить если докер

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // database: 'my_db_name',
  // username: 'postgres',
  // password: 'newPassword',
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
});
