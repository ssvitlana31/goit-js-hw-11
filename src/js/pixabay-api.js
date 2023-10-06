import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '39829920-01ffc9c03864e4c35c3c45cf7';

  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 40;
  }

  async getPhotos() {
    const PARAMS = new URLSearchParams({
      key: this.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.perPage,
      page: this.page,
    });

    const url = `${this.#BASE_URL}?${PARAMS}`;
    const res = await axios.get(url);
    return res.data;
  }
}
