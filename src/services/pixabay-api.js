function fetchImages(name, page) {
  const DEFAULT_URL = 'https://pixabay.com/api/';
  const KEY = '27181891-3778ead93a3f3d83793e3b927';

  return fetch(
    `${DEFAULT_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No images on ${name} topic`));
  });
}

const api = {
  fetchImages,
};

export default api;
