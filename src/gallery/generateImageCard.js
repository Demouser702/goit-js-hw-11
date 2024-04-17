import { gallery } from '../index';

export const generateImageCard = image => {
  const card = document.createElement('div');
  card.classList.add('image-card');
  const imgEl = document.createElement('img');
  imgEl.src = image.webformatURL;
  imgEl.alt = image.tags;
  imgEl.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('photo-info');
  const infoElements = ['Likes', 'Views', 'Comments', 'Downloads'];
  infoElements.forEach(item => {
    const p = document.createElement('p');
    p.classList.add('info-element');
    p.innerHTML = `<b>${item}</b>: ${image[item.toLowerCase()]}`;
    info.appendChild(p);
  });
  card.appendChild(imgEl);
  card.appendChild(info);
  gallery.appendChild(card);
};
