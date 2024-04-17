import Notiflix from 'notiflix';
import axios from 'axios';
import { generateImageCard } from '../gallery/generateImageCard';
import { BASE_URL, API_KEY, gallery, btnLoadMore } from '../index';

export const fetchGallery = async (searchQuery, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    const { totalHits, hits } = response.data;
    if (page === 1) {
      gallery.innerHTML = ''; // Clear the gallery for new search
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    if (hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      hits.forEach(image => {
        generateImageCard(image);
      });

      if (page === 1) {
        btnLoadMore.style.display = 'block';
      }

      page++;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
