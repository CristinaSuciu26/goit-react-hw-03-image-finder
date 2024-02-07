import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  render() {
    return (
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
        >
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
