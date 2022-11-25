import { Button, Paper, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import type { TGame } from '../../../../shared/types';
import { useGetUserQuery } from '../../services/redux/queries/user.api';
import { setGame } from '../../services/redux/reducers/common.reducer';
import { useAppDispatch } from '../../services/redux/store';
import { socket } from '../../services/socket/socket';
import Layout from '../Layout/Layout';

export const CreateOrJoinGamePage = () => {
  const classes = useStyles();
  const [roomValue, setRoomValue] = useState('');
  const { data: currentUser } = useGetUserQuery();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeRoomValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRoomValue(e.target.value.toUpperCase()),
    [setRoomValue]
  );

  useEffect(() => {
    socket.on('createdRoom', (game: TGame) => {
      dispatch(setGame(game));

      navigate('/waiting-room');
    });

    socket.on('joinedRoom', (game: TGame) => {
      dispatch(setGame(game));

      navigate('/waiting-room');
    });
  }, []);

  const handleCreateRoomClick = () => {
    if (currentUser) {
      socket.emit('createRoom', currentUser);
    }
  };

  const handleJoinRoomClick = () => {
    if (currentUser) {
      socket.emit('joinRoom', roomValue, currentUser);
    }
  };

  return (
    <Layout>
      <Paper elevation={3} className={classes.wrapper}>
        <h1 className={classes.head}>MULTIPLAYER</h1>

        <Paper elevation={3} className={classes.block}>
          <h2 className={classes.head}>CREATE THE GAME</h2>
          <Button variant="contained" className={classes.btn} onClick={handleCreateRoomClick}>
            GO
          </Button>
        </Paper>
        <Paper elevation={3} className={classes.block}>
          <h2 className={classes.head}>JOIN THE GAME</h2>
          <div className={classes.joinBlock}>
            <TextField
              name="room"
              value={roomValue}
              onChange={changeRoomValue}
              color={'secondary'}
              label={'Enter room code'}
              size="small"
            />
            <Button variant="contained" className={classes.btn} onClick={handleJoinRoomClick}>
              JOIN
            </Button>
          </div>
        </Paper>
      </Paper>
    </Layout>
  );
};
