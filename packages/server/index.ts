import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import socketIo from 'socket.io';


import type { IClientToServerEvents, IServerToClientEvents } from '../shared/types';

 
createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

dotenv.config();

const PATH_TO_CLIENT_DIR = process.env.NODE_ENV === 'development' ? '../client' : '../../../client';

const render = require(PATH_TO_CLIENT_DIR + '/dist-ssr/entry-server.cjs').render;

const app = express();
app.use((_req: any, res: any, next: any) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    'Content-Security-Policy': 'default-src *',
    'X-Content-Security-Policy': 'default-src *',
    'X-WebKit-CSP': 'default-src *',
    'media-src': 'https://yandex.ru',
  });
  next();
});
const { Server } = socketIo;

const http = require('http');

const server = http.createServer(app);

const io = new Server<IClientToServerEvents, IServerToClientEvents>(server, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
  },
});

app.use(cors());

const port = Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 3001;

app.use(express.static(path.join(__dirname, PATH_TO_CLIENT_DIR + '/dist'), { index: false }));

app.use((req, res) => {
  const { html, cssString, store, emotionCss } = render(req.url);

  const template = path.resolve(__dirname, PATH_TO_CLIENT_DIR + '/dist/index.html');
  const htmlString = fs.readFileSync(template, 'utf-8');
  const newString = htmlString
    .replace('<!--SSR_EMOTION_STYLES-->', emotionCss)
    .replace('<!--SSR_JSS-->',  `<style id="jss-server-side">${cssString}</style>`)
    .replace('<!--SSR_OUTLET-->', html)
    .replace(
      '<!--__PRELOADED_STATE__-->',
      `window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(/</g, '\\u003c')}`
    );

  res.send(newString);
});

app.get('/api', (_, res) => {
  res.send(`👋 Howdy from the server! VERSION: ${version}`);
});

addSocket(io);

server.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
