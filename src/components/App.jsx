import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

import React, { Component } from 'react';
import Button from './Button';
import Loader from './Loader';
import imagesAPI from '../services/pixabay-api';

export class App extends Component {
  // idle
  // pending
  // rejected
  // resolved
  state = {
    searchInfo: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    totalHits: 0,
  };

  smoothScrolling() {
    const { height: cardHeight } = document
      .querySelector('#root')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 0.425,
      behavior: 'smooth',
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchInfo !== this.state.searchInfo ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
      if (this.state.page > 1) {
        setTimeout(() => this.smoothScrolling(), 250);
      }
    }
  }

  fetchImages = () => {
    this.setState({ status: 'pending' });
    // pixibay-api import
    imagesAPI
      .fetchImages(this.state.searchInfo, this.state.page)
      .then(images =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
            totalHits: images.totalHits,
          };
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  // for SearcBar component
  handleFormSubmit = searchInfo => {
    this.setState(prevState => {
      if (prevState.searchInfo !== searchInfo) {
        return {
          images: [],
          page: 1,
          searchInfo: searchInfo,
          totalHits: 0,
        };
      }
    });
  };

  // for Button component
  handleIncreasePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { searchInfo, images, status, error, totalHits } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && (
          <p className={styles.text}> Hello! What you want to find?</p>
        )}
        {status === 'rejected' && (
          <p className={styles.text}>{error.message}</p>
        )}

        {status === 'resolved' && images.length === 0 && (
          <p className={styles.text}>No images on {searchInfo} topic</p>
        )}
        {images.length > 0 && <ImageGallery images={images} />}
        {totalHits > images.length && status !== 'pending' && (
          <Button onClick={this.handleIncreasePage} />
        )}
        {status === 'pending' && <Loader />}

        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
