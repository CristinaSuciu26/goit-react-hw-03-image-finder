import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  render() {
    const { src, alt, onClick } = this.props;

    return (
      <li className={styles.galleryItem}>
        <img
          className={styles.galleryItemImage}
          src={src}
          alt={alt}
          onClick={onClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
