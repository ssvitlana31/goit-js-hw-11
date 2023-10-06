import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabay-api';
import makeGalleryCard from '../templates/gallery-card.hbs';

const pixabay = new PixabayAPI();
const listEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const loadMoreEl = document.querySelector('.btn-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onLoadMoreClick = async () => {
  try {
    pixabay.page += 1;

    const response = await pixabay.getPhotos();
    const { hits, totalHits } = response;
    const totalPage = Math.ceil(totalHits / 40);

    const galleryMarkup = makeGalleryCard(hits);
    listEl.insertAdjacentHTML('beforeend', galleryMarkup);
    lightbox.refresh();

    if (totalPage === pixabay.page) {
      removeBtnLoadMore();
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .lastElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
};

const onSubmit = async e => {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  pixabay.query = searchQuery.trim();
  pixabay.page = 1;

  try {
    if (!pixabay.query) {
      Notify.failure('Sorry, enter a valid query. Please try again.');
      return;
    }
    const response = await pixabay.getPhotos();

    const { hits, totalHits } = response;

    const totalPage = Math.ceil(totalHits / 40);

    if (totalHits > 0) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (totalPage === 0) {
      removeBtnLoadMore();
      listEl.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (totalPage === 1) {
      const galleryMarkup = makeGalleryCard(hits);
      listEl.innerHTML = galleryMarkup;
      lightbox.refresh();
      return;
    }

    const galleryMarkup = makeGalleryCard(hits);
    listEl.innerHTML = galleryMarkup;
    lightbox.refresh();
    addBtnLoadMore();
  } catch (error) {
    console.log('No result for your request', error);
  }
};

const removeBtnLoadMore = e => {
  loadMoreEl.classList.add('is-hidden');
  loadMoreEl.removeEventListener('click', onLoadMoreClick);
  Notify.info("We're sorry, but you've reached the end of search results.");
};

const addBtnLoadMore = () => {
  loadMoreEl.classList.remove('is-hidden');
  loadMoreEl.addEventListener('click', onLoadMoreClick);
};

formEl.addEventListener('submit', onSubmit);

// async function onSubmit(e) {
//   e.preventDefault();
//   submitClick = true;
// }

// function imageTemplate(images) {
//   return images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `
//             <div class="photo-card">
//               <a class = "link-photo" href = "${largeImageURL}" >
//                 <img src="${webformatURL}" alt="${tags}" loading="lazy"  width="380"
//                     height="300" />
//               </a>
//               <div class="info">
//                 <p class="info-item">
//                    <b class = "b">Likes</b>
//                    ${likes}
//                 </p>
//                 <p class="info-item">
//                    <b class = "b">Views</b>
//                    ${views}
//                 </p>
//                 <p class="info-item">
//                    <b class = "b">Comments</b>
//                    ${comments}
//                 </p>
//                 <p class="info-item">
//                    <b class = "b">Downloads</b>
//                    ${downloads}
//                 </p>
//                </div>
//             </div>
//             `;
//       }
//     )
//     .join('');
// }

//
