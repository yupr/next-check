import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './index.module.scss';

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

  // getValuesで取得したデータは、watchと異なりデータの監視を常に行う訳ではないので、
  // 最新のデータを取得したい場合、getValuesを定義し直さないと再取得できない。(getValuesでデータを取りたい場合)
  // コンポーネントにgetValuesで定義されたデータを取得し表示することができた理由は、
  // 最初にコンポーネントがレンダリングされて、データを入力後 送信ボタン(onSubmit) を実行
  // 再度レンダリングが走り、入力時のデータがgetValueで取得できるのでそれを返している。
  // onSubmit関数で更新後のデータを取得できなかったのは、関数を実行した後に再レンダリングされたため。

  return (
    <>
      <div className={styles.validation}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>userName:</span>
          <input
            className={styles.validation__input}
            {...register('userName', { required: true })}
          />
          <span>password:</span>
          <input
            className={styles.validation__input}
            {...register('password', { required: true })}
          />

          <div className={styles.validation__errors}>
            {errors.userName && <span>ユーザーネームの入力は必須です</span>}
            {errors.password && <span>パスワードの入力は必須です</span>}
          </div>

          <input className={styles.validation__submit} type="submit" />
        </form>
      </div>
    </>
  );
};

export default Validation;
