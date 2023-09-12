import { ChangeEvent, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useLogin } from '@/hooks/auth';
import { AxiosError } from 'axios';
import { css } from '@emotion/react';
// import Error from '@/pages/_error';

const Connect = () => {
  const { data: user, isFetching } = useUser();
  const fetchLogin = useLogin();
  const [loginMsg, setLoginMsg] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');

  const login = async () => {
    fetchLogin.mutate(
      { userName: userName, pass: passWord },
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

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // isLoading が enabled = false だった場合、機能しないためisFetchingで暫定対応。
  // https://github.com/TanStack/query/issues/3584
  if (isFetching) {
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
          <div>
            <div>userName</div>
            <input type="text" onChange={(e) => onChangeUserName(e)} />
          </div>
          <div>
            <div>pass</div>
            <input type="password" onChange={(e) => onChangePassword(e)} />
          </div>

          <button
            css={css({ marginTop: '15px' })}
            data-testid={'loginButton'}
            onClick={() => login()}
          >
            ログイン
          </button>
          <div> {loginMsg}</div>
        </>
      )}
    </div>
  );
};

export default Connect;
