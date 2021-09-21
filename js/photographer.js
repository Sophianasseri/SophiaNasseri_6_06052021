/* eslint-disable import/extensions */
import { fetchPhotographer, fetchMedia, factory } from './functions.js';

export const pageId = new URLSearchParams(window.location.search).get('id');

let photographerData = [];
export const photographerBannerDisplay = async () => {
  photographerData = await fetchPhotographer();
  const getPhotographerId = photographerData.find((element) => element.id === parseInt(pageId, 10));
  const tags = [];
  for (let i = 0; i < getPhotographerId.tags.length; i += 1) {
    tags.push(
      `  <li><a href="#" class="tag" data-tag="${getPhotographerId.tags[i]}">#${getPhotographerId.tags[i]}</a></li>`,
    );
  }

  document.querySelector('.photographer-banner').innerHTML = `
      
  <div class="photographer-banner__description">
  <h1 class="photographer-banner__name profile-name">${
  getPhotographerId.name
}</h1>
  <div>
      <p class="photographer-banner__location profile-location">${
  getPhotographerId.city
}, ${getPhotographerId.country}</p>
      <p class="photographer-banner__tagline">${getPhotographerId.tagline}</p>
  </div>
   <ul>
       <li><a href="#" class="tags" data-tags=""></a>${tags.join('')}</li>
       <span></span>
   </ul>
 </div>
 <button class="modal-btn btn">Contactez-moi</button>
 <img src="images/photographers/${
  getPhotographerId.portrait
}" class="profile-image" alt="">
 `;
};
photographerBannerDisplay();

let mediaData = [];

const mediaDisplay = async (filter) => {
  mediaData = await fetchMedia();

  const photoId = mediaData.filter((element) => element.photographerId === parseInt(pageId, 10));
  if (filter === 'Popularité') {
    // Tri par popularité
    photoId.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  } else if (filter === 'Date') {
    photoId.sort((a, b) => (a.date < b.date ? 1 : -1));
  } else if (filter === 'Titre') {
    photoId.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  // Tri par date

  // Afficher les images en fonction de l'id du photographe
  const mediaContainer = document.querySelector('.media-display');
  mediaContainer.innerHTML = '';
  photoId.forEach((element) => {
    const media = factory(element);
    mediaContainer.innerHTML += media.displayList();
  });
};
mediaDisplay('Popularité');

// Dropdown
const toggle = document.querySelector('.dropdown__toggle');
const menu = document.querySelector('.dropdown__menu');

const toggler = (expand = null) => {
  const display = expand === null ? menu.getAttribute('aria-expanded') !== 'true' : expand;

  menu.setAttribute('aria-expanded', display);

  if (display) {
    toggle.classList.add('active');
  } else {
    toggle.classList.remove('active');
  }
};

toggle.addEventListener('click', () => {
  toggler();
});

const option = menu.querySelectorAll('li');

const setValue = (element) => {
  const elt = element;
  const elementContent = element.textContent;
  const toggleContent = toggle.textContent;
  toggle.textContent = elementContent;
  elt.textContent = toggleContent;
  mediaDisplay(toggle.innerText);
  toggler(false);
};
option.forEach((item) => {
  item.addEventListener('click', () => setValue(item));
});
