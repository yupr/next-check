import axios, { AxiosError } from 'axios';

const BaseUrl = 'http://localhost:3000';

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
    const statusCode = err.response?.status;
    if (statusCode === 400) {
      console.log('status_code', statusCode);
    }

    return Promise.reject(err);
  }
);

export default instance;
