import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import { useAddUserMutation } from '../../../services/redux/queries/leaderboard.api';
import { getUserLoginSelector } from '../../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../../services/redux/store';

type TGameFinalScreenProps = {
  points: number;
};

const GameFinalScreen = ({ points }: TGameFinalScreenProps) => {
  const classes = useStyles();
  const login = useAppSelector(getUserLoginSelector);
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    addUser({ points, login });
  }, [points]);

  const newGameHandler = () => {
    navigate('/game');
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Typography className={classes.subTitle}>
          Your score is: <b>{points} points</b>
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
