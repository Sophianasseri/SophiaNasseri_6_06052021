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
        <div class="media-element">
        <img src="images/media/${this.image}" alt="" class="media-element__thumb"></img>
          <div class="media-element__info">
        <p>${this.title}</p>
        <p>${this.likes}</p>
        <i></i>
          </div>
        </div>`;
  }
}
