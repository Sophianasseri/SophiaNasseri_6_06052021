/* eslint-disable import/extensions */
import { mediaDisplay } from './photographer.js';

class Lightbox {
  static async init() {
    await mediaDisplay('Popularité');
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"'));
    const gallery = links.map((link) => link.getAttribute('href'));

    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      new Lightbox(e.currentTarget.getAttribute('href'), gallery);
    }));
  }

  // Récupérer l'url du média
  constructor(url, gallery) {
    this.element = this.buildDOM(url);
    this.gallery = gallery;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  loadMedia(url) {
    this.url = null;
    this.url = url;
  }

  // Fermer la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add('fade-out');
    window.setTimeout(() => {
      this.element.remove(this.element);
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e);
    }
  }

  next(e) {
    e.preventDefault();
    const i = this.gallery.findIndex((media) => media === this.url);
    this.loadMedia(this.gallery[i + 1]);
  }

  prev(e) {
    e.preventDefault();
  }

  // Afficher la lightbox
  buildDOM(url) {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    dom.innerHTML = `
      <div class="lightbox">
      <button class="lightbox__close">Fermer</button>
      <button class="lightbox__next">Suivant</button>
      <button class="lightbox__prev">Précédent</button>
      <div class="lightbox__container">
        <img src="./${url}" alt="" />
      </div>
    </div>`;
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
    return dom;
  }
}

Lightbox.init();

const lightbox = document.querySelector('.lightbox');
lightbox.classList.remove('close');
const lightboxContainer = document.createElement('div');
lightboxContainer.classList.add('lightbox__container');
lightbox.appendChild(lightboxContainer);
const mediaUrl = e.currentTarget.getAttribute('href');
console.log(mediaUrl);
  lightboxContainer.innerHTML = `
 <img src="./${mediaUrl}" alt=""/>
<p>${title}</p>`;*/

const factory2 = (media) => {
  if (media.image) {
    return new LightboxImage(media);
  }
  if (media.video) {
    return new LightboxVideo(media);
  }
};
const lightbox = document.querySelector('.lightbox');
lightbox.classList.remove('close');
const lightboxContainer = document.createElement('div');
lightboxContainer.classList.add('lightbox__container');
lightbox.appendChild(lightboxContainer);
const photoId = mediaData.filter((element) => element.photographerId === parseInt(pageId, 10))

photoId.forEach((element) => {
  
  const media = factory2(element);
  lightboxContainer.innerHTML += media.displayLightbox(mediaUrl);
})