/* eslint-disable import/prefer-default-export */
export class LightboxVideo {
  constructor(media, url) {
    this.element = this.displayLightbox(url);
    this.title = media.title;
  }

  displayLightbox(url) {
    return `
    <button class="lightbox__prev">Précédent</button>
    <div class = "lightbox-media">
      <video controls="">
          <source src="${url}" type="video/mp4"/>
      </video>
      <p>${this.title}</p>
    </div>
    <div class= "lightbox-btn">
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
    </div>
          `;
  }
}
