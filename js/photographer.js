/* eslint-disable import/extensions */
import {
  getMediasFromPhotographer, factory, getPhotographerId, pageId,
} from './functions.js';

// Elements DOM
const mediaContainer = document.querySelector('.media-display');
const toggle = document.querySelector('.dropdown__toggle');
const menu = document.querySelector('.dropdown__menu');
const option = menu.querySelectorAll('li');
const lightbox = document.querySelector('.lightbox');
const lightboxContainer = document.createElement('div');

let photographerData = [];
let mediaData = [];

const photographerBannerDisplay = async () => {
  photographerData = await getPhotographerId();
  const tags = [];
  for (let i = 0; i < photographerData.tags.length; i += 1) {
    tags.push(
      `  <li><a href="#" class="tag" data-tag="${photographerData.tags[i]}">#${photographerData.tags[i]}</a></li>`,
    );
  }

  document.querySelector('.photographer-banner').innerHTML = `
      
    <div class="photographer-banner__description">
    <h1 class="photographer-banner__name profile-name">${photographerData.name}</h1>
      <div>
        <p class="photographer-banner__location profile-location">${photographerData.city}, ${photographerData.country}</p>
        <p class="photographer-banner__tagline">${photographerData.tagline}</p>
      </div>
      <ul>
        <li><a href="#" class="tags" data-tags=""></a>${tags.join('')}</li>
        <span></span>
      </ul>
    </div>
    <button class="modal-btn btn">Contactez-moi</button>
    <img src="images/photographers/${photographerData.portrait}" class="profile-image" alt="">
 `;
};
photographerBannerDisplay();

const mediaDisplay = async (filter) => {
  mediaData = await getMediasFromPhotographer(pageId);
  // Trier les médias en fonction du filtre
  if (filter === 'Popularité') {
    mediaData.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  } else if (filter === 'Date') {
    mediaData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } else if (filter === 'Titre') {
    mediaData.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  // Afficher les images en fonction de l'id du photographe

  mediaContainer.innerHTML = '';
  mediaData.forEach((element) => {
    const media = factory(element);
    if (media !== undefined) {
      mediaContainer.innerHTML += media.displayList();
    }
  });
};

// Dropdown

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

mediaDisplay('Popularité').then(() => {
  const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"');

  // Créer le container de la lightbox
  lightboxContainer.classList.add('lightbox__container');
  lightbox.appendChild(lightboxContainer);

  const close = () => {
    lightbox.classList.add('close');
    document.removeEventListener('keyup', onKeyUp);
  };
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  const createMedia = (media) => {
    lightboxContainer.innerHTML = '';
    const mediaLightbox = factory(media);
    if (media !== undefined) {
      lightboxContainer.innerHTML += mediaLightbox.displayLightbox();
    }
    let i = mediaData.findIndex((element) => element.id === media.id);

    // Navigation dans la lightbox
    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    window.addEventListener('keyup', onKeyUp);
    lightbox.querySelector('.lightbox__next').addEventListener('click', () => {
      if (i === mediaData.length - 1) {
        i = 0;
      } else {
        i += 1;
      }
      createMedia(mediaData[i]);
    });
    lightbox.querySelector('.lightbox__prev').addEventListener('click', () => {
      if (i === 0) {
        i = mediaData.length - 1;
      } else {
        i -= 1;
      }
      createMedia(mediaData[i]);
    });
  };

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const mediaId = mediaData.find((elt) => elt.id === parseInt(e.currentTarget.dataset.id, 10));

      e.preventDefault();
      lightbox.classList.remove('close');
      createMedia(mediaId);
    });
  });
});
