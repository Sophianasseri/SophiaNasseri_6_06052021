/* eslint-disable import/prefer-default-export */
export class ImageMedia {
  constructor(media) {
    this.title = media.title;
    this.image = media.image;
    this.likes = media.likes;
  }

  displayList() {
    return `
        <div class="media-element">
        <a href="./images/media/${this.image}">
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
}
