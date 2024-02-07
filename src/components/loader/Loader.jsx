import { Component } from 'react';
import styles from './Loader.module.css';
import { ThreeDots as LoaderSpinner } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <LoaderSpinner color="#00BFFF" height={50} width={50} />
      </div>
    );
  }
}

export default Loader;
