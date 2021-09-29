/* eslint-disable import/prefer-default-export */
export class LightboxVideo {
  constructor(media) {
    this.title = media.title;
    this.url = media.video;
  }

  displayLightbox() {
    return `
    <button class="lightbox__prev">Précédent</button>
    <div class = "lightbox-media">
      <video controls="">
          <source src="./images/media/${this.url}" type="video/mp4"/>
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
