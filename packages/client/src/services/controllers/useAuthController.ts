import { useNavigate } from 'react-router-dom';

import { setIsLoading, setUser, toggleAuthModalState } from '../../store/commonSlice';
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
    dispatch(setIsLoading(true));
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
      .catch(handleError)
      .finally(() => dispatch(setIsLoading(false)));
  }

  function signInController(formData: AuthApiSignIn) {
    dispatch(setIsLoading(true));
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
      .catch(handleError)
      .finally(() => dispatch(setIsLoading(false)));
  }

  function logoutController() {
    dispatch(setIsLoading(true));
    logout()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.clear();
      })
      .then(() => dispatch(setUser(INITIAL_USER)))
      .catch(handleError)
      .finally(() => dispatch(setIsLoading(false)));
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
