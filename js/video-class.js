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
          <div class="media-display">
          <video src="images/media/${this.video}" alt="" class="media-display__thumb"></video>
            <div class="media-display__info">
          <p>${this.title}</p>
          <p>${this.likes}</p>
          <i></i>
            </div>
          </div>`;
  }
}
