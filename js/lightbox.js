/* eslint-disable import/prefer-default-export */
export class LightboxImage {
  constructor(media, url) {
    this.element = this.displayLightbox(url);
    this.image = media.image;
    this.title = media.title;
  }

  displayLightbox(url) {
    return `
        <div class="lightbox__container">
          <img src="${url}" alt=""/>
          <p>${this.title}</p>
      </div>`;
  }
}
