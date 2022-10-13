import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_FORM_DATA } from './constants';
import { useStyles } from './useStyles';

import { AuthApiSignIn } from '../../../services/api/AuthApi';
import authController from '../../../services/controllers/AuthController';
import { setUser, toggleAuthModalState } from '../../../store/commonSlice';
import { useAppDispatch } from '../../../store/hooks';
import { handleError } from '../../../utils/apiHandler';

const LoginForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<AuthApiSignIn>(DEFAULT_FORM_DATA);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();

    authController
      .signIn({ formData, navigate })
      .then(r => {
        dispatch(setUser(r));
        dispatch(toggleAuthModalState());
      })
      .catch(handleError);
  };

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={signInHandler}>
      <TextField
        name="login"
        value={formData.login}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Login'}
        required
        fullWidth
      />
      <TextField
        name="password"
        value={formData.password}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Password'}
        required
        fullWidth
      />
      <div className={classes.buttonCase}>
        <Button className={classes.button} color={'secondary'}>
          Forgot password?
        </Button>
        <Button type={'submit'} className={classes.button} variant={'outlined'}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
