import { handleError } from '../../utils/apiHandler';
import { IS_AUTHORIZED_KEY } from '../../utils/constants';
import authApi, { AuthApiSignIn, AuthApiSignUp } from '../api/AuthApi';

interface ISignUpProps {
  formData: AuthApiSignUp;
  navigate: (to: string) => void;
}
interface ISignInProps {
  formData: AuthApiSignIn;
  navigate: (to: string) => void;
}

class AuthController {
  public signUp({ formData, navigate }: ISignUpProps) {
    return authApi
      .signUp(formData)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.setItem(IS_AUTHORIZED_KEY, 'true');

        return this._getUser();
      })
      .catch(handleError);
  }

  public signIn({ formData, navigate }: ISignInProps) {
    return authApi
      .signIn(formData)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.setItem(IS_AUTHORIZED_KEY, 'true');

        return this._getUser();
      })
      .catch(handleError);
  }

  public logout(navigate: (to: string) => void) {
    return authApi
      .logout()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
        sessionStorage.clear();
      })
      .catch(handleError);
  }

  private _getUser() {
    return authApi
      .getUser()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);

        return r.json();
      })
      .catch(handleError);
  }
}

export default new AuthController();
