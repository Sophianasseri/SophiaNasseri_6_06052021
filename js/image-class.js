export class ImageMedia {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.image = media.image;
    this.tags = media.tags;
    this.likes = media.likes;
  }
  displayList() {
    return `
        <div class="media-display">
        <img src="images/media/${this.image}" alt="" class="media-display__thumb"></img>
          <div class="media-display__info">
        <p>${this.title}</p>
        <p>${this.likes}</p>
        <i></i>
          </div>
        </div>`;
  }
}
