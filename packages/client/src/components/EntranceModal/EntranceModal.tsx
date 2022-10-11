import { Close } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react';

import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { useStyles } from './useStyles';

interface IEntranceModalProps {
  onClose: () => void;
}

const EntranceModal = ({ onClose }: IEntranceModalProps) => {
  const [isRegistration, setIsRegistration] = React.useState(false);
  const classes = useStyles();

  const changeFormHandler = () => {
    setIsRegistration(!isRegistration);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.modalBody}>
        <div className={classes.headingCase}>
          <Typography variant={'h1'} className={classes.title}>
            {isRegistration ? 'Sign up' : 'Sign in'}
          </Typography>
          <Button onClick={onClose} className={classes.exitButton}>
            <Close className={classes.exitIcon} />
          </Button>
        </div>
        {isRegistration ? <RegistrationForm /> : <LoginForm />}
        <div className={classes.changeFormCase}>
          <p>{isRegistration ? 'Already have an account?' : 'No account?'}</p>
          <Button className={classes.changeFormButton} onClick={changeFormHandler}>
            {isRegistration ? 'Sign in!' : 'Sign up!'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EntranceModal);