import useBaseApi from './useBaseApi';

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

const useAuthApi = () => {
  const { post, get } = useBaseApi({ path: '/auth' });

  function signUp(data: AuthApiSignUp) {
    return post('/signup', {
      body: JSON.stringify(data),
    });
  }

  function signIn(data: AuthApiSignIn) {
    return post('/signin', {
      body: JSON.stringify(data),
    });
  }

  function getUser() {
    return get('/user');
  }

  function logout() {
    return post('/logout');
  }

  return { signUp, signIn, getUser, logout };
};

export default useAuthApi;
