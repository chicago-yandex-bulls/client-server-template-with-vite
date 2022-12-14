import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { sequelize } from './db';
import { errorHandler } from './middleware/ErrorHandlingMiddleware';
import { ssrHandler } from './middleware/SSRHandlingMiddleware';
import { staticHandler } from './middleware/StaticHandlingrMiddleware';
import { version } from './package.json';
import { router } from './routes';
import { addSocket } from './socket';

import http from 'http';

dotenv.config({
  path: '../../.env',
});

const app = express();

const port = Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 3001;

const server = http.createServer(app);

addSocket(server);

app.use(cors());
app.use(express.json());
app.get('/api', (_, res) => {
  res.send(`👋 Howdy from the server! VERSION: ${version}`);
});
app.use('/api', router);

app.use(staticHandler);
app.use(ssrHandler);

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    server.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
