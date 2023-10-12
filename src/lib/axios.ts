import axios, { AxiosError } from 'axios';

export const BaseUrl = 'http://localhost:3000';

const instance = axios.create({
  baseURL: BaseUrl,
});

instance.interceptors.request.use(
  (config) => {
    const headers = config.headers;

    config.headers = {
      ...headers,
      'X-Custom-Type': 'custom_value',
    };

    return config;
  },
  (err: AxiosError<{ error: string }>) => {
    console.log('req_error', err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: AxiosError<{ error: string }>) => {
    return Promise.reject(err);
  }
);

export default instance;
