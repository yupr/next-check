import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from '@emotion/react';

interface formInput {
  userName: string;
  password: string;
}

const Validation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>();

  const onSubmit: SubmitHandler<formInput> = (data) => console.log(data);

  // getValuesで取得したデータは、watchと異なり、データの監視を常に行う訳ではない。
  // そのため最新のデータを取得したい場合、getValuesを定義し直さないと再取得できない。

  // コンポーネントにgetValuesで定義されたデータを取得し表示することができた理由は、最初にコンポーネントがレンダリングされて、データを入力後 送信ボタン(onSubmit) を実行
  // 再度レンダリングが走り、入力時のデータが getValue で取得できるのでそれを返している。
  // onSubmit関数で更新後のデータを取得できなかったのは、関数を実行した後に再レンダリングされたため。

  const spanStyles = css({
    lineHeight: 2,
    textAlign: 'left',
    display: 'block',
    marginBottom: '13px',
    marginTop: '20px',
    color: 'black',
    fontSize: '14px',
    fontWeight: 400,
  });

  const inputStyles = css({
    width: '100%',
    display: 'flex',
    borderRadius: '4px',
    border: '1px solid black',
    padding: '15px 15px',
    marginBottom: '10px',
  });

  const pStyles = css({
    color: 'red',
    '&::before': {
      display: 'inline',
      content: '"⚠ "',
    },
  });

  const submitStyles = css({
    background: '#ec5990',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
    marginTop: '30px',
    padding: '20px',
    fontSize: '16px',
    fontWeight: 100,
    letterSpacing: '10px',
  });

  return (
    <form
      css={css({ maxWidth: '500px', margin: '0 auto' })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span css={spanStyles}>userName:</span>
      <input css={inputStyles} {...register('userName', { required: true })} />
      {errors.userName && <p css={pStyles}>ユーザーネームの入力は必須です</p>}

      <span css={spanStyles}>password:</span>
      <input css={inputStyles} {...register('password', { required: true })} />
      {errors.password && <p css={pStyles}>パスワードの入力は必須です</p>}

      <input css={submitStyles} type="submit" />
    </form>
  );
};

export default Validation;
