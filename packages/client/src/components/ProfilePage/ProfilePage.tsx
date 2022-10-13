
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import authController from '../../services/controllers/AuthController';
import { setUser } from '../../store/commonSlice';
import { INITIAL_USER } from '../../store/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { InitialUserType } from '../../store/interfaces';
import Layout from '../Layout/Layout';

const ProfilePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { first_name, second_name } = useAppSelector<InitialUserType>(state => state.common.currentUser);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    authController.logout(navigate).then(() => dispatch(setUser(INITIAL_USER)));
  };

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.userName}>{first_name}</p>
        <p className={classes.userName}>{second_name}</p>
        <Button className={classes.userName} onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      <div className={classes.decorates}>
        <div className={classes.round} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
