import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '38181676-c389c3ce2b1eee7a286cf8f0e';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = this.perPage;
  }

  getPhotos() {
    const searchParams = {
      key: this.#API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.perPage,
      page: this.page,
    };

    return axios
      .get(`${this.#BASE_URL}?`, { params: searchParams })
      .then(res => res.data);
  }
}
