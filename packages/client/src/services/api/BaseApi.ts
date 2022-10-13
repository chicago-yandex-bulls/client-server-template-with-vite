const DEFAULT_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8',
};

type OptionsType = Record<string, Record<string, string | boolean> | string | boolean>;

interface IBaseApi {
  baseUrl?: string;
  path?: `/${string}`;
  headers?: Record<string, string>;
}

class BaseApi {
  private readonly _baseUrl: string;
  private readonly _path: string;
  private readonly _headers: Record<string, string>;

  constructor(config: IBaseApi = {}) {
    this._baseUrl = config.baseUrl || 'https://ya-praktikum.tech/api/v2';
    this._path = config.path || '';
    this._headers = config.headers || DEFAULT_HEADERS;
  }

  private getPath() {
    return `${this._baseUrl}${this._path}`;
  }

  get headers() {
    return this._headers;
  }

  private handleOptions(newOptions?: OptionsType) {
    const options = newOptions || {};
    options.headers = newOptions?.headers || this._headers;
    options.withCredentials = true;
    options.credentials = 'include';

    return options;
  }

  post(endpoint: `/${string}`, options?: OptionsType) {
    return fetch(this.getPath() + endpoint, this.handleOptions({ ...options, method: 'POST' }));
  }

  get(endpoint: `/${string}`, options?: OptionsType) {
    return fetch(this.getPath() + endpoint, this.handleOptions({ ...options, method: 'GET' }));
  }
}

export default BaseApi;
