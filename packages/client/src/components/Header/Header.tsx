import { Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import { toggleAuthModalState } from '../../store/commonSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IS_AUTHORIZED_KEY } from '../../utils/constants';
import EntranceModal from '../EntranceModal/EntranceModal';

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthModalOpen } = useAppSelector(state => state.common);
  const isAuthorized = !!sessionStorage.getItem(IS_AUTHORIZED_KEY);
  const dispatch = useAppDispatch();

  const openEntranceModalHandler = () => {
    dispatch(toggleAuthModalState());
  };

  const openProfilePageHandler = () => {
    navigate('/profile');
  };

  return (
    <>
      {isAuthModalOpen && <EntranceModal />}
      <div className={classes.wrapper}>
        <div>
          <h1 className={classes.logo}>
            <span style={{ color: 'red' }}>Chicago</span>Snake
          </h1>
          <p className={classes.logoSubtitle}>Yandex Practicum Web Gaming</p>
        </div>
        <div className={classes.menu}>
          <Link to={'/'} className={classes.button}>
            about
          </Link>
          <Link to={'/forum'} className={classes.button}>
            forum
          </Link>
          <Link to={'/leaderboard'} className={classes.button}>
            leaderboard
          </Link>
          <Button
            size={'medium'}
            variant={'outlined'}
            onClick={isAuthorized ? openProfilePageHandler : openEntranceModalHandler}
            className={classes.signButton}>
            {isAuthorized ? 'Profile' : 'Sign in'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
