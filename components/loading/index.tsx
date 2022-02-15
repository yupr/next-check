import React from "react";
import { Oval } from "react-loader-spinner";
import styles from './index.module.scss'

const Loading = ({isVisible}: any) => {
  return (
    <div className={styles.loading}>
      <Oval
        ariaLabel="loading-indicator"
        color="blue"
        height="100"
        width="100"
        secondaryColor="blue"
        visible={isVisible}
      />
    </div>
  );
};

export default Loading;
