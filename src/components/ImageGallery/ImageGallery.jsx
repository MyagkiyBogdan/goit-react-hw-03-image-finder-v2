import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {images.map(img => (
          <ImageGalleryItem
            key={img.id}
            webformatURL={img.webformatURL}
            largeImageURL={img.largeImageURL}
            tags={img.tags}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
