import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { ChangePasswordForm } from './parts/ChangePasswordForm';
import { EditProfileForm } from './parts/EditProfileForm';
import { useStyles } from './useStyles';

import { RESOURCES_URL } from '../../../../shared/consts/common';
import { isErrorWithReason } from '../../../../shared/types/typeGuards/isErrorWithReason';
import { useSnackbarError } from '../../hooks/useSnackbarError';
import { useLogoutMutation } from '../../services/redux/queries/auth.api';
import { useUpdateAvatarMutation } from '../../services/redux/queries/user.api';
import { getUserSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../services/redux/store';
import { useNavigatorOnLine } from '../../services/sw/useNavigatorOnLine';

const videoConstraints = {
  width: 512,
  height: 384,
  facingMode: 'user',
};

export const ProfilePage = () => {
  const webcamRef = useRef<any>(null);

  const classes = useStyles();
  const isOnline = useNavigatorOnLine();

  const { SnackbarErrorComp, setError } = useSnackbarError();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isTakePhotoOpen, setIsTakePhotoOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const { data } = useAppSelector(getUserSelector);

  const [logout] = useLogoutMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  const { first_name = '', second_name = '', avatar = '', login = '', phone = '', email = '' } = data || {};

  const logoutHandler = () => {
    logout();
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const arr: string[] = imageSrc.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const blob = new Blob([u8arr], { type: mime });
    const form = new FormData();
    form.append('avatar', blob);

    try {
      await updateAvatar(form).unwrap();
      setIsEditProfileOpen(false);
    } catch (err) {
      if (isErrorWithReason(err)) {
        setError(err.data.reason);
      } else {
        setError('Something wrong...');
      }
    }
  }, [webcamRef]);

  const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedAvatar = event.target.files;
    const file = uploadedAvatar?.[0];

    if (file) {
      const form = new FormData();
      form.append('avatar', file);

      try {
        await updateAvatar(form).unwrap();
        setIsEditProfileOpen(false);
      } catch (err) {
        if (isErrorWithReason(err)) {
          setError(err.data.reason);
        } else {
          setError('Something wrong...');
        }
      }
    }
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.userName}>{first_name}</div>
        <div className={classes.userName}>{second_name}</div>
      </div>
      <Avatar className={classes.avatar} src={RESOURCES_URL + avatar}>
        <PersonIcon className={classes.personIcon} />
      </Avatar>
      <Button className={classes.uploadBtn} color="info" variant="contained" component="label" disabled={!isOnline}>
        Upload
        <input hidden accept="image/*" type="file" onChange={handleChangeAvatar} />
      </Button>

      <Button
        className={classes.uploadBtn}
        color="info"
        variant="contained"
        component="label"
        onClick={() => setIsTakePhotoOpen(true)}>
        Take photo
      </Button>

      <div className={classes.userInfo}>{login}</div>
      <div className={classes.userInfo}>{email}</div>
      <div className={classes.userInfo}>{phone}</div>

      <div className={classes.roundChangeProfile}>
        <Button
          className={classes.btnChangeProfile}
          variant="contained"
          color="secondary"
          disabled={!isOnline}
          onClick={() => {
            setIsEditProfileOpen(true);
          }}>
          Edit profile
        </Button>
        <Button
          className={classes.btnChangePassword}
          variant="contained"
          color="secondary"
          disabled={!isOnline}
          onClick={() => {
            setIsChangePasswordOpen(true);
          }}>
          Change password
        </Button>
      </div>
      <div className={classes.roundLogout}>
        <Button className={classes.btnLogout} variant="contained" onClick={logoutHandler} disabled={!isOnline}>
          Logout
        </Button>
      </div>

      <Dialog open={isTakePhotoOpen} onClose={() => setIsTakePhotoOpen(false)}>
        <DialogTitle>TAKE PHOTO</DialogTitle>
        <DialogContent>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            minScreenshotWidth={180}
            minScreenshotHeight={180}
          />
          <Button className={classes.uploadBtn} color="info" variant="contained" component="label" onClick={capture}>
            Take photo
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} fullScreen>
        <DialogTitle>EDIT PROFILE</DialogTitle>
        <DialogContent>
          <EditProfileForm onCloseModal={() => setIsEditProfileOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}>
        <DialogTitle>CHANGE PASSWORD</DialogTitle>
        <DialogContent>
          <ChangePasswordForm onCloseModal={() => setIsChangePasswordOpen(false)} />
        </DialogContent>
      </Dialog>
      <SnackbarErrorComp />
    </div>
  );
};
