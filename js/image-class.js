/* eslint-disable import/prefer-default-export */
export class ImageMedia {
  constructor(media) {
    this.photographer = media.photographerId;
    this.id = media.id;
    this.title = media.title;
    this.image = media.image;
    this.likes = media.likes;
    this.tags = media.tags;
    this.alt = media.alt;
  }

  displayList() {
    return `
        <div class="media-element" data-tag="${this.tags}">
          <a data-id="${this.id}" href="./images/${this.photographer}/${this.image}">
          <img src="images/${this.photographer}/${this.image}" alt="${this.alt}" class="media-element__thumb">
          </a>
          <div class="media-element__info">
            <p class="media-element__title">${this.title}</p>
            <div tabindex="0" class ="media-likes">
               <p class="media-likes__number">${this.likes}</p>
               <i class="fas fa-heart media-likes__icon" aria-label="likes"></i>
            </div>
          </div>
        </div>`;
  }

  displayLightbox() {
    return `
    <button class="lightbox__close">Fermer la fenêtre</button>
    <button class="lightbox__prev">Média précédent</button>
    <div class = "lightbox-media">
    <img src="./images/${this.photographer}/${this.image}" alt="${this.alt}"/>
    <p>${this.title}</p>
    </div>
    <button class="lightbox__next">Média</button>
           `;
  }
}
