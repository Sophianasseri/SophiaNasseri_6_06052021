/* eslint-disable import/prefer-default-export */
export class VideoMedia {
  constructor(media) {
    this.id = media.id;
    this.title = media.title;
    this.video = media.video;
    this.likes = media.likes;
    this.tags = media.tags;
  }

  displayList() {
    return `
          <div class="media-element" data-tag="${this.tags}">
            <a data-id="${this.id}" href="./images/media/${this.video}">
              <video src="images/media/${this.video}" alt="" class="media-element__thumb"></video>
            </a>
            <div class="media-element__info">
              <p class="media-element__title">${this.title}</p>
              <div class ="media-likes">
                <p class="media-likes__number">${this.likes}</p>
                <i class="fas fa-heart media-likes__icon" aria-label="likes"></i>
              </div>
            </div>
          </div>`;
  }

  displayLightbox() {
    return `
    <button class="lightbox__close">Fermer</button>
    <button class="lightbox__prev">Précédent</button>
    <div class = "lightbox-media">
      <video controls="">
          <source src="./images/media/${this.video}" type="video/mp4"/>
      </video>
      <p>${this.title}</p>
    </div>
    <button class="lightbox__next">Suivant</button>
          `;
  }
}
