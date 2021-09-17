export class VideoMedia {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.video = media.video;
    this.tags = media.tags;
    this.likes = media.likes;
  }
  displayList() {
    return `
          <div class="media-element">
          <video src="images/media/${this.video}" alt="" class="media-element__thumb"></video>
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
