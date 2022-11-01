import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import { leaderboardController } from '../../../services/controllers/leaderboardController';
import { useAppSelector } from '../../../store/hooks';

const GameFinalScreen = () => {
  const classes = useStyles();
  const { currentUser, lastScore: score } = useAppSelector(state => state.common);
  const { id, display_name, login } = currentUser;
  const navigate = useNavigate();
  const { addUserToLeaderboard } = leaderboardController();

  useEffect(() => {
    addUserToLeaderboard({
      id: id || 0,
      username: display_name || login,
      points: score || 0,
    });
  }, []);

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

export default GameFinalScreen;
