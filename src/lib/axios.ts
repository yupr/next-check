import axios from 'axios';

const instance = axios.create();

// 例: login(post) の resからtokenを取得して、リクエストヘッダーにセットする場合
// const login = async () => {
//   try {
//     const res = await axios.post('/login');
//     if (res.data?.token) {
//       instance.defaults.headers.common['auth-token'] = res.data.token;
//     }
//   } catch (err) {
//     console.log('err', err);
//   }
// };

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      'X-Custom-Type': 'custom_value',
    };

    return config;
  },
  (err) => {
    if (axios.isAxiosError(err)) {
      console.log('error', err);
    }
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (axios.isAxiosError(err)) {
      console.log('error', err);

      // if (err.response?.status) {
      //   console.log('status_code', err.response.status);
      // }
    }
    return Promise.reject(err);
  }
);

export default instance;
