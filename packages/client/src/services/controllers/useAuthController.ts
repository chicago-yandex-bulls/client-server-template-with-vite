import { useNavigate } from 'react-router-dom';

import { setUser, toggleAuthModalState } from '../../store/commonSlice';
import { INITIAL_USER } from '../../store/constants';
import { useAppDispatch } from '../../store/hooks';
import { handleError } from '../../utils/apiHandler';
import { IS_AUTHORIZED_KEY } from '../../utils/constants';
import useAuthApi, { AuthApiSignIn, AuthApiSignUp } from '../api/useAuthApi';

const useAuthController = () => {
  const { signUp, signIn, getUser, logout } = useAuthApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function signUpController(formData: AuthApiSignUp) {
    signUp(formData)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.setItem(IS_AUTHORIZED_KEY, 'true');

        return _getUserController();
      })
      .then(r => {
        dispatch(setUser(r));
        dispatch(toggleAuthModalState());
      })
      .catch(handleError);
  }

  function signInController(formData: AuthApiSignIn) {
    signIn(formData)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.setItem(IS_AUTHORIZED_KEY, 'true');

        return _getUserController();
      })
      .then(r => {
        dispatch(setUser(r));
        dispatch(toggleAuthModalState());
      })
      .catch(handleError);
  }

  function logoutController() {
    logout()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.clear();
      })
      .then(() => dispatch(setUser(INITIAL_USER)))
      .catch(handleError);
  }

  function _getUserController() {
    return getUser()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);

        return r.json();
      })
      .catch(handleError);
  }

  return { signInController, signUpController, logoutController };
};

export default useAuthController;
