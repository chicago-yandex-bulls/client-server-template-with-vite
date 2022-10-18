import { Button, TextField } from '@mui/material';
import React from 'react';

import { DEFAULT_FORM_DATA } from './constants';
import { useStyles } from './useStyles';

import { TAuthApiSignIn } from '../../../services/api/useAuthApi';
import useAuthController from '../../../services/controllers/useAuthController';
import useOAuthController from '../../../services/controllers/useOAuthController';

const LoginForm = () => {
  const classes = useStyles();
  const { signInController } = useAuthController();
  const { makeYandexAuth } = useOAuthController();
  const [formData, setFormData] = React.useState<TAuthApiSignIn>(DEFAULT_FORM_DATA);

  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    signInController(formData);
  };

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const oAuthHandler = () => {
    makeYandexAuth('http://127.0.0.1:3000/');
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
      <Button className={classes.button} variant={'contained'} onClick={oAuthHandler}>
        OAuth
      </Button>
    </form>
  );
};

export default LoginForm;
