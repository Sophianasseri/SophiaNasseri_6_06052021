/* eslint-disable import/prefer-default-export */
export class ImageMedia {
  constructor(media) {
    this.id = media.id;
    this.title = media.title;
    this.image = media.image;
    this.likes = media.likes;
  }

  displayList() {
    return `
        <div class="media-element">
          <a data-id="${this.id}" href="./images/media/${this.image}">
          <img src="images/media/${this.image}" alt="" class="media-element__thumb">
          </a>
          <div class="media-element__info">
            <p class="media-element__title">${this.title}</p>
            <div class ="media-likes">
               <p class="media-likes__number">${this.likes}</p>
               <i class="fas fa-heart" aria-label="likes"></i>
            </div>
          </div>
        </div>`;
  }

  displayLightbox() {
    return `
    <button class="lightbox__close">Fermer</button>
    <button class="lightbox__prev">Précédent</button>
    <div class = "lightbox-media">
    <img src="./images/media/${this.image}" alt=""/>
    <p>${this.title}</p>
    </div>
    <button class="lightbox__next">Suivant</button>
           `;
  }
}
