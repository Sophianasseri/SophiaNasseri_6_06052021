export function factory(media) {
  let createMedia;
  if (media === "image") {
    createMedia = new image();
  } else if (media === "video") {
    createMedia = new video();
  }

  return createMedia;
}

class image {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.image = media.image;
    this.tags = media.tags;
    this.likes = media.likes;
  }
  createImage() {
    return `<div class="media-filter">
          <p>Trier par</p>
          <select name="" id="">Popularité</select>
        </div>
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

class video {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.image = media.image;
    this.tags = media.tags;
    this.likes = media.likes;
  }
  createVideo() {
    return `<div class="media-filter">
          <p>Trier par</p>
          <select name="" id="">Popularité</select>
        </div>
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
