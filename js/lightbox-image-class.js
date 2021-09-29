/* eslint-disable import/prefer-default-export */
export class LightboxImage {
  constructor(media) {
    this.title = media.title;
    this.url = media.image;
  }

  displayLightbox() {
    return `
    <button class="lightbox__prev">Précédent</button>
    <div class = "lightbox-media">
    <img src="./images/media/${this.url}" alt=""/>
    <p>${this.title}</p>
    </div>
    <div class= "lightbox-btn">
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
    </div>
           `;
  }
}
