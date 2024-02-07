import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './image-gallery/ImageGallery';
import ImageGalleryItem from './image-gallery-item/ImageGalleryItem';
import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import pixabayService from './pixabay/Pixabay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      images: [],
      page: 1,
      loading: false,
      modalOpen: false,
      selectedImage: {
        src: '',
        alt: '',
      },
    };
  }

  fetchImages = async (inputValue, page) => {
    this.setState({ loading: true });

    try {
      const { images, totalHits } = await pixabayService.searchImages(
        inputValue,
        page
      );

      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState(prevState => ({
        images: page === 1 ? images : [...prevState.images, ...images],
        page: page + 1,
        isLastPage: prevState.images.length + images.length >= totalHits,
      }));
    } catch (error) {
      this.setState({ error: 'Error fetching images. Please try again.' });
    } finally {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    const { inputValue, page } = this.state;
    const nextPage = page + 1;

    this.fetchImages(inputValue, nextPage);
  };

  handleChange = event => {
    const newValue = event.target.value;
    this.setState({ inputValue: newValue }, () => {
      console.log('inputValue is now:', this.state.inputValue);
    });
  };

  handleSearchSubmit = inputValue => {
    if (this.state.inputValue === inputValue) {
      return;
    }
    this.setState({
      inputValue: inputValue,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });

    this.fetchImages(inputValue, 1);
  };

  openModal = image => {
    this.setState({
      modalOpen: true,
      selectedImage: {
        src: image.webformatURL,
        alt: image.tags,
      },
    });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <div>
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <ImageGallery>
          {this.state.images.map((image, index) => (
            <ImageGalleryItem
              key={`${image.id}-${index}`}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.openModal(image)}
            />
          ))}
        </ImageGallery>

        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && (
          <Button onClick={this.loadMore} disabled={this.state.loading}>
            {this.state.loading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        <Modal
          isOpen={this.state.modalOpen}
          onClose={this.closeModal}
          src={this.state.selectedImage.src}
          alt={this.state.selectedImage.alt}
        />
      </div>
    );
  }
}
