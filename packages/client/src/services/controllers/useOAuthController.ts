import useOAuthApi from '../api/useOAuthApi';

const useOAuthController = () => {
  const { getServiceId } = useOAuthApi();

  async function makeYandexAuth(redirectUrl: string) {
    const { service_id } = await _getServiceId(redirectUrl);

    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=https://oauth.yandex.ru/${service_id}`;
    // await signIn({ code: service_id, redirect_uri: redirectUrl })
    //   .then(r => r.json())
    //   .then(r => console.log(r));
  }

  function _getServiceId(redirectUrl: string) {
    return getServiceId(redirectUrl).then(r => r.json());
  }

  // function signUpController(formData: TAuthApiSignUp) {
  //   dispatch(setIsLoading(true));
  //   signUp(formData)
  //     .then(r => {
  //       if (!r.ok) throw new Error(r.statusText);
  //       navigate('/');
  //
  //       return _getUserController();
  //     })
  //     .then(r => {
  //       dispatch(setUser(r));
  //       dispatch(toggleAuthModalState());
  //     })
  //     .catch(handleError)
  //     .finally(() => dispatch(setIsLoading(false)));
  // }

  return { makeYandexAuth };
};

export default useOAuthController;
