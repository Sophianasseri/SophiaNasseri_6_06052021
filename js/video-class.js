/* eslint-disable import/prefer-default-export */
export class VideoMedia {
  constructor(media) {
    this.title = media.title;
    this.video = media.video;
    this.likes = media.likes;
  }

  displayList() {
    return `
          <div class="media-element">
          <a href="./images/media/${this.video}">
            <video src="images/media/${this.video}" alt="" class="media-element__thumb"></video>
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
