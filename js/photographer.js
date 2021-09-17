import { fetchPhotographer, fetchMedia, factory } from "./functions.js";

const pageId = new URLSearchParams(location.search).get("id");

let photographerData = [];
const photographerBannerDisplay = async () => {
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

function dropdownDisplay(dropdownEl) {
  const [toggler, menu] = dropdownEl.children;

  const setValue = (item) => {
    const value = item.textContent;
    toggler.textContent = value;
    this.toggle(false);
  };

  toggler.addEventListener("click", () => this.toggle());

  [...menu.children].forEach((item) => {
    item.addEventListener("click", () => setValue(item));
  });

  this.element = dropdownEl;
  this.value = toggler.textContent;
  this.toggle = (expand = null) => {
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;
    menu.setAttribute("aria-expanded", expand);

    if (expand) {
      toggler.classList.add("active");
    } else {
      toggler.classList.remove("active");
    }
  };
}

const dropdown = new dropdownDisplay(document.querySelector(".dropdown"));

dropdown.element.addEventListener("change", () => {
  console.log("change", dropdown.value);
});
