import { Oval } from 'react-loader-spinner';
import styles from './index.module.scss';

type Props = {
  isVisible: boolean;
};

const Loader = ({ isVisible }: Props) => {
  return (
    <div className={styles.loading}>
      <Oval
        ariaLabel="oval-loading"
        color="#1e8eff"
        height="100"
        width="100"
        secondaryColor="#1e8eff"
        visible={isVisible}
      />
    </div>
  );
};

export default Loader;
