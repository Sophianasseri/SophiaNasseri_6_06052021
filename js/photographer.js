/* eslint-disable import/extensions */
import {
  getMediasFromPhotographer, factory, getPhotographerId, pageId,
} from './functions.js';

// Elements DOM
const photogapherMedia = document.querySelector('.photographer-media');
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

// Likes
const totalOfLikesDisplay = async () => {
  photographerData = await getPhotographerId();
  const likesEl = Array.from(document.querySelectorAll('.media-likes__number')).map((like) => parseInt(like.innerText, 10));
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const totalOfLikes = likesEl.reduce(reducer);
  document.querySelector('.like-counter').innerHTML = `
      <div class="total-likes">
      <p class="total-likes__number">${totalOfLikes}</p>
      <i class="fas fa-heart"></i>
    </div>
    <p>${photographerData.price}€/jour</p>
      `;
};

// Naviguer dans la lightbox
const navigate = (medias, index, direction) => {
  let newIndex = index;
  if (direction === 'next') {
    if (index === medias.length - 1) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }
  } else if (direction === 'prev') {
    if (index === 0) {
      newIndex = medias.length - 1;
    } else {
      newIndex -= 1;
    }
  }
  return medias[newIndex];
};

const manageLightbox = () => {
  const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"');

  // Créer le container de la lightbox
  lightboxContainer.classList.add('lightbox__container');
  lightbox.appendChild(lightboxContainer);

  const close = () => {
    photogapherMedia.style.display = ('block');
    lightbox.classList.add('close');
    // eslint-disable-next-line no-use-before-define
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
    const i = mediaData.findIndex((element) => element.id === media.id);

    // Navigation dans la lightbox
    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    window.addEventListener('keyup', (e) => {
      if (e.key === ('ArrowRight')) {
        const nextMedia = navigate(mediaData, i, 'next');
        createMedia(nextMedia);
      } else if (e.key === ('ArrowLeft')) {
        const prevMedia = navigate(mediaData, i, 'prev');
        createMedia(prevMedia);
      }
      onKeyUp(e);
    });
    lightbox.querySelector('.lightbox__next').addEventListener('click', () => {
      const nextMedia = navigate(mediaData, i, 'next');
      createMedia(nextMedia);
    });
    lightbox.querySelector('.lightbox__prev').addEventListener('click', () => {
      const prevMedia = navigate(mediaData, i, 'prev');
      createMedia(prevMedia);
    });
  };

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const mediaId = mediaData.find((elt) => elt.id === parseInt(e.currentTarget.dataset.id, 10));

      e.preventDefault();
      photogapherMedia.style.display = ('none');
      lightbox.classList.remove('close');
      createMedia(mediaId);
    });
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
  // Afficher la lightbox au changement de filtre
  mediaDisplay(toggle.innerText).then(() => {
    manageLightbox();
  });
  toggler(false);
};
option.forEach((item) => {
  item.addEventListener('click', () => setValue(item));
});

mediaDisplay('Popularité').then(() => {
  // Afficher la lightbox au chargement de la page
  manageLightbox();
  totalOfLikesDisplay();
});
