import { Button } from '@mui/material';
import React from 'react';

import './GamePage.css';
import { CanvasComponent } from '../../game/CanvasComponent';
import Layout from '../Layout/Layout';

export const GamePage = () => {
  const toggleFullScreen = () => {
    const gameCanvas = document.querySelector('#game');

    if (gameCanvas) {
      gameCanvas.requestFullscreen().catch(e => {
        console.error('Ошибка fullscreen', e);
      });
    }
  };

  return (
    <Layout>
      <div className='game-page-wrapper'>
        <CanvasComponent />
        <Button  onClick={toggleFullScreen} variant="outlined" >Fullscreen режим</Button>
      </div>
    </Layout>
  );
};
