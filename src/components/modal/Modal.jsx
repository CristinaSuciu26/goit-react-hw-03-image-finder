import { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  }
  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOutside = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div
        className={styles.overlay}
        onClick={this.handleClickOutside}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
      >
        <div className={styles.modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
