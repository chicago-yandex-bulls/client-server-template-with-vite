import BaseApi from './BaseApi';

export type AuthApiSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  repeat_password: string;
};

export type AuthApiSignIn = {
  login: string;
  password: string;
};

class AuthApi extends BaseApi {
  constructor() {
    super({ path: '/auth' });
  }

  public signUp(data: AuthApiSignUp) {
    return this.post('/signup', {
      body: JSON.stringify(data),
    });
  }

  public signIn(data: AuthApiSignIn) {
    return this.post('/signin', {
      body: JSON.stringify(data),
    });
  }

  public getUser() {
    return this.get('/user');
  }

  public logout() {
    return this.post('/logout');
  }
}

export default new AuthApi();
