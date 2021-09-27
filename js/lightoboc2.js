/* eslint-disable import/prefer-default-export */
export class LightboxVideo {
  constructor(media, url) {
    this.element = this.displayLightbox(url);
    this.video = media.video;
    this.title = media.title;
  }

  displayLightbox(url) {
    return `
        <div class="lightbox__container">
          <video controls="">
          <source src="assets/${url}" type="video/mp4"/>
          <video>
          <p>${this.title}</p>
      </div>`;
  }
}
