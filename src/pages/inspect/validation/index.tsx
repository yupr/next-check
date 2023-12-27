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

  // getValuesで取得したデータは、watchと異なり、データの監視を常に行う訳ではない。
  // そのため最新のデータを取得したい場合、getValuesを定義し直さないと再取得できない。

  // コンポーネントにgetValuesで定義されたデータを取得し表示することができた理由は、最初にコンポーネントがレンダリングされて、データを入力後 送信ボタン(onSubmit) を実行
  // 再度レンダリングが走り、入力時のデータが getValue で取得できるのでそれを返している。
  // onSubmit関数で更新後のデータを取得できなかったのは、関数を実行した後に再レンダリングされたため。

  return (
    <>
      <div className={styles.validation}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>userName:</span>
          <input {...register('userName', { required: true })} />
          {errors.userName && <p>ユーザーネームの入力は必須です</p>}

          <span>password:</span>
          <input {...register('password', { required: true })} />
          {errors.password && <p>パスワードの入力は必須です</p>}

          <input className={styles.validation__submit} type="submit" />
        </form>
      </div>
    </>
  );
};

export default Validation;
