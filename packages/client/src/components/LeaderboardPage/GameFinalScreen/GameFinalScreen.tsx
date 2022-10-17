import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

const GameFinalScreen = ({ score }: { score: number | null }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const newGameHandler = () => {
    navigate('/game');
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Typography className={classes.subTitle}>
          Your score is: <b>{score} points</b>
        </Typography>
        <Button className={classes.button} variant={'outlined'} onClick={newGameHandler}>
          Play again!
        </Button>
      </div>
      <div>
        <Typography className={classes.title} variant={'h1'}>
          Congratulations!
        </Typography>
      </div>
    </div>
  );
};

export default React.memo(GameFinalScreen);
