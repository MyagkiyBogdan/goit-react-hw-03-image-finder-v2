import React, { Component } from 'react';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchInputInfo: '',
  };

  handleInputChange = event => {
    this.setState({ searchInputInfo: event.target.value.toLocaleLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Что бы не шли запросы с пустой строкой
    if (this.state.searchInputInfo.trim() === '') {
      return toast.error('Write what you want to find');
    }

    this.props.onSubmit(this.state.searchInputInfo);
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            value={this.state.searchInputInfo}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
