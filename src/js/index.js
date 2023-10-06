import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './unsplash-api';

const pixabay = new PixabayAPI(20);

pixabay.getPhotos().then(console.log);

// const listEl = document.querySelector('.gallery');
// const formEl = document.querySelector('.search-form');
// const inputEl = document.querySelector('[name="searchQuery"]');
// const loadMoreEl = document.querySelector('.btn-load-more');
// const searchEl = document.querySelector('.btn-submit');

// const perPage = 40;
// let page = 1;
// let searchQuery = '';
// let submitClick = false;

// let gallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// formEl.addEventListener('submit', onSubmit);

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

// function renderPage(images) {
//   const markup = imageTemplate(images);
//   listEl.insertAdjacentHTML('beforeend', markup);
// }
