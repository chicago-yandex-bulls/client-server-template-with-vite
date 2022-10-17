import React from 'react';

import { CanvasComponent } from '../../game/CanvasComponent';
import Layout from '../Layout/Layout';

export const GamePage = () => {
  return (
    <Layout>
      <CanvasComponent />
      <p>
        To play in fullscreen mode or exit it, please, <b>press Enter</b>
      </p>
    </Layout>
  );
};
