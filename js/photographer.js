import { fetchPhotographer, fetchMedia, factory } from "./functions.js";

export const pageId = new URLSearchParams(location.search).get("id");

let photographerData = [];
export const photographerBannerDisplay = async () => {
  photographerData = await fetchPhotographer();

  const getPhotographerId = photographerData.find(
    (element) => element.id == pageId
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

const mediaDisplay = async () => {
  mediaData = await fetchMedia();
  const photoId = mediaData.filter(
    (element) => element.photographerId == pageId
  );
  const mediaContainer = document.querySelector(".media-display");
  photoId.forEach((element) => {
    let media = factory(element);
    mediaContainer.innerHTML += media.displayList();
  });
};
mediaDisplay();

//Dropdown
const toggle = document.querySelector(".dropdown__toggle");
const menu = document.querySelector(".dropdown__menu");

const toggler = (expand = null) => {
  expand =
    expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;

  menu.setAttribute("aria-expanded", expand);

  if (expand) {
    toggle.classList.add("active");
  } else {
    toggle.classList.remove("active");
  }
};

toggle.addEventListener("click", () => {
  toggler();
});

const option = menu.querySelectorAll("li");

option.forEach((item) => {
  item.addEventListener("click", () => setValue(item));
});

const setValue = (element) => {
  const elementValue = element.textContent;
  const toggleValue = toggle.textContent;
  toggle.textContent = elementValue;
  element.textContent = toggleValue;

  toggler(false);
};
