import useBaseApi from './useBaseApi';

export type TAuthApiSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  repeat_password: string;
};

export type TAuthApiSignIn = {
  login: string;
  password: string;
};

const useOAuthApi = () => {
  const { post, get } = useBaseApi({ path: '/oauth/yandex' });

  function signIn(data: any) {
    return post({ endpoint: '/', data });
  }

  function getServiceId(redirectUrl: string) {
    return get(`/service-id?redirect_uri=${redirectUrl}`);
  }

  return { signIn, getServiceId };
};

export default useOAuthApi;
