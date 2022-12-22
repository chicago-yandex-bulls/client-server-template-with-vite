import type { Request, Response } from 'express';

import { PATH_TO_CLIENT_DIR } from '../consts/common';

import fs from 'fs';
import path from 'path';

export function ssrHandler(req: Request, res: Response) {
  const render = require(PATH_TO_CLIENT_DIR + '/dist-ssr/entry-server.cjs').render;

  const { html, cssString, store, emotionCss } = render(req.url);

  const template = path.resolve(__dirname, PATH_TO_CLIENT_DIR + '/dist/index.html');
  const htmlString = fs.readFileSync(template, 'utf-8');
  const newString = htmlString
    .replace('<!--SSR_EMOTION_STYLES-->', emotionCss)
    .replace('<!--SSR_JSS-->', `<style id="jss-server-side">${cssString}</style>`)
    .replace('<!--SSR_OUTLET-->', html)
    .replace(
      '<!--__PRELOADED_STATE__-->',
      `window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(/</g, '\\u003c')}`
    );

  res.send(newString);
}
