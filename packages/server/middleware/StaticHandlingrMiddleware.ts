import express from 'express';

import { PATH_TO_CLIENT_DIR } from '../consts/common';

import path from 'path';

export const staticHandler = express.static(path.join(__dirname, PATH_TO_CLIENT_DIR + '/dist'), { index: false });
