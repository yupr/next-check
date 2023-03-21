import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useLogin } from '@/hooks/auth';
import { AxiosError } from 'axios';
import { css } from '@emotion/react';
// import Error from '@/pages/_error';

const Connect = () => {
  const { data: user, isLoading } = useUser();
  const fetchLogin = useLogin();
  const [loginMsg, setLoginMsg] = useState<string>('');

  const login = () => {
    fetchLogin.mutate(
      { userName: 'carl', pass: 'password' },
      {
        onSuccess: (res) => {
          if (res?.message) {
            setLoginMsg(res.message);
          }
          localStorage.setItem('isAuth', 'true');
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            const message = err?.message || 'server error';
            console.error(message);
          }

          const isLSAuth = localStorage.getItem('isAuth');
          if (isLSAuth) {
            localStorage.setItem('isAuth', 'false');
          }
        },
      }
    );
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // if (isError) {
  //   const statusCode = error.response?.status;

  //   // TODO: api通信の失敗時のレスポンスの型を定義
  //   const errMsg = 'Not authorized';
  //   return <Error statusCode={statusCode} message={errMsg}></Error>;
  // }

  return (
    <div css={css({ margin: '15px' })}>
      <h2>ユーザー情報</h2>
      {user ? (
        <>
          <div>id: {user.id}</div>
          <div>name: {user.name}</div>
        </>
      ) : (
        <>
          <button css={css({ marginTop: '15px' })} onClick={() => login()}>
            ログイン
          </button>
          <div> {loginMsg}</div>
        </>
      )}
    </div>
  );
};

export default Connect;
