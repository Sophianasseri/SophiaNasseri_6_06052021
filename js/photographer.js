import { photographerData, fetchPhotographer } from "./index.js";
import { factory } from "./mediaDisplay.js";

const getUrlId = new URLSearchParams(location.search).get("id");
const photographerBannerDisplay = async () => {
  await fetchPhotographer();

  const getPhotographerId = photographerData.find(
    (element) => element.id == getUrlId
  );
  let tags = [];
  for (let i = 0; i < getPhotographerId.tags.length; i++) {
    tags.push(
      `  <li><a href="#" class="tag" data-tag="${getPhotographerId.tags[i]}">#${getPhotographerId.tags[i]}</a></li>`
    );
  }

  document.querySelector(".photographer-banner").innerHTML = `
      
  <div class="photographer-banner__description">
  <h1 class="photographer-banner__name profile-name">${
    getPhotographerId.name
  }</h1>
  <div>
      <p class="photographer-banner__location profile-location">${
        getPhotographerId.city
      }, ${getPhotographerId.country}</p>
      <p class="photographer-banner__tagline">${getPhotographerId.tagline}</p>
  </div>
   <ul>
       <li><a href="#" class="tags" data-tags=""></a>${tags.join("")}</li>
       <span></span>
   </ul>
 </div>
 <button class="modal-btn btn">Contactez-moi</button>
 <img src="images/photographers/${
   getPhotographerId.portrait
 }" class="profile-image" alt="">
 `;
};
photographerBannerDisplay();

let mediaData = [];

const fetchMedia = async () => {
  await fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => (mediaData = data.media));
};

const mediaDisplay = async () => {
  await fetchMedia();
  const getMediaId = mediaData.find(
    (element) => element.photographerId == getUrlId
  );

  document.querySelector(".photographer-media").innerHTML = factory(mediaData);
};

mediaDisplay();
