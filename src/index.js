import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm.js';
import { fetchGallery } from './js/fetchGallery';
export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '42026902-f9352e492811d87412855420c';
const searchForm = document.getElementById('search-form');
export const btnLoadMore = document.querySelector('.load-more');
export const gallery = document.querySelector('.gallery');
let page = 1;
let searchQuery = '';

async function handleFormSubmit(event) {
  event.preventDefault();
  page = 1;
  searchQuery = event.target.elements.searchQuery.value;

  if (!searchQuery) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  await fetchGallery(searchQuery);
}

const handleLoadMore = () => {
  fetchGallery();
  lazyScroll();
};
const lazyScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'lazy',
  });
};
searchForm.addEventListener('submit', handleFormSubmit);
btnLoadMore.addEventListener('click', handleLoadMore);
const lightbox = new SimpleLightbox('.gallery', {
  captionsData: 'alt',
  captionDelay: 250,
});
