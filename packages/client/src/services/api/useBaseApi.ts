const DEFAULT_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8',
};

type OptionsType = Record<string, Record<string, string | boolean> | string | boolean>;

interface IBaseApi {
  baseUrl?: string;
  path?: `/${string}`;
  headers?: Record<string, string>;
}

const useBaseApi = (config: IBaseApi = {}) => {
  const { baseUrl = 'https://ya-praktikum.tech/api/v2', headers = DEFAULT_HEADERS, path = '' } = config;

  function getPath() {
    return `${baseUrl}${path}`;
  }

  function handleOptions(newOptions?: OptionsType) {
    const options = newOptions || {};
    options.headers = newOptions?.headers || headers;
    options.withCredentials = true;
    options.credentials = 'include';

    return options;
  }

  function post(endpoint: `/${string}`, options?: OptionsType) {
    return fetch(getPath() + endpoint, handleOptions({ ...options, method: 'POST' }));
  }

  function get(endpoint: `/${string}`, options?: OptionsType) {
    return fetch(getPath() + endpoint, handleOptions({ ...options, method: 'GET' }));
  }

  return { post, get };
};

export default useBaseApi;
