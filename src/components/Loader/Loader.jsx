import { Circles } from 'react-loader-spinner';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <Circles height="35" width="35" color="black" ariaLabel="loading" />
      <span className={styles.text}>Loading...</span>
    </div>
  );
}

export default Loader;
