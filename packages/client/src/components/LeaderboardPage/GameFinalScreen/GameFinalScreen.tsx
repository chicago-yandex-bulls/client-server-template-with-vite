import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MultiplayerFinalScreen } from './MultiplayerFinalScreen/MultiplayerFinalScreen';
import { useStyles } from './useStyles';

import { useAddUserMutation } from '../../../services/redux/queries/leaderboard.api';
import { getUserIdSelector, getUserLoginSelector } from '../../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../../services/redux/store';
import { IMultiPLayerScore } from '../../../services/redux/types/commonState';

type TGameFinalScreenProps = {
  points: number | IMultiPLayerScore[];
};

const GameFinalScreen = ({ points }: TGameFinalScreenProps) => {
  const classes = useStyles();
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [singlePlayerScore, setSinglePlayerScore] = useState(2);
  const [players, setPlayers] = useState<IMultiPLayerScore[] | []>([]);
  const login = useAppSelector(getUserLoginSelector);
  const id = useAppSelector(getUserIdSelector);
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    if (Array.isArray(points)) {
      setIsMultiplayer(true);
      const { points: playerPoints, login: playerLogin } = points.filter(
        (player: IMultiPLayerScore) => player.id === id
      )[0];
      addUser({ points: playerPoints, login: playerLogin });
      setPlayers([...points].sort((a, b) => b.points - a.points));
    } else {
      setSinglePlayerScore(points);
      addUser({ points, login });
    }
  }, [points]);

  const newGameHandler = () => {
    navigate(isMultiplayer ? '/create-or-join-game' : '/game');
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          {!isMultiplayer && (
            <Typography className={classes.subTitle}>
              Your score is: <b>{singlePlayerScore} points</b>
            </Typography>
          )}
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
      {isMultiplayer && <MultiplayerFinalScreen currentPlayerId={id} players={players} />}
    </>
  );
};

export default GameFinalScreen;
