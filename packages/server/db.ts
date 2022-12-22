import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({
  path: '../../.env',
});

function createSequelize() {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    return new Sequelize({
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    });
  } else {
    const dbUrl = process.env.DATABASE_URL as string;

    return new Sequelize(dbUrl, {
      dialect: 'postgres',
      // TODO: заменить локалхост
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    });
  }
}

export const sequelize = createSequelize();
