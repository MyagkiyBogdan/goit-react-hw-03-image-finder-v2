import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from '../Modal';
class ImageGalleryItem extends Component {
  state = { showModal: false, modalSrc: '', modalAlt: '' };

  toggleModal = (src, alt) => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        modalSrc: src,
        modalAlt: alt,
      };
    });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal, modalSrc, modalAlt } = this.state;
    return (
      <>
        <li className={styles.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            className={styles.ImageGalleryItemImage}
            onClick={() => this.toggleModal(largeImageURL, tags)}
          />
        </li>
        {showModal && (
          <Modal src={modalSrc} alt={modalAlt} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
