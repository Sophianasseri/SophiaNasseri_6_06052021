//Bouton passer au contenu
const mainLink = document.querySelector(".main-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    mainLink.style.display = "inline";
  } else {
    mainLink.style.display = "none";
  }
});

export let photographerData = [];

export const fetchPhotographer = async () => {
  await fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => (photographerData = data.photographers));
};

const photographerDisplay = async () => {
  await fetchPhotographer();
  document.querySelector(".photographer-container").innerHTML = photographerData
    .map((photographer) => {
      let tags = [];
      for (let i = 0; i < photographer.tags.length; i++) {
        tags.push(
          `  <li><a href="#" class="tag" data-tag="${photographer.tags[i]}">#${photographer.tags[i]}</a></li>`
        );
      }

      return `
        <section class="photographer">
          <a href="./photographer.html?id=${
            photographer.id
          }" class="photographer-link">
            <img src="images/photographers/${
              photographer.portrait
            }" class="profile-image" alt="" />
            <h2 class="photographer__name profile-name">${
              photographer.name
            }</h2>
          </a>
          <div class="photographer__description">
            <p class="photographer__location profile-location">${
              photographer.city
            }, ${photographer.country}</p>
            <p class="photographer__tagline">${photographer.tagline}</p>
           <p class="photographer__price">${photographer.price}€/jour</p>
          </div>
          <ul>
            ${tags.join("")}
            <span></span>
         </ul>
      </section>

        `;
    })
    .join("");
};

photographerDisplay();

//Filtres
const tagFilter = async () => {
  await fetchPhotographer();
  await photographerDisplay();

  const tagEl = document.querySelectorAll(".tag");

  tagEl.forEach((tags) => {
    tags.addEventListener("click", (e) => {
      e.target.dataset.tag;

      const photographerEl = document.querySelectorAll(".photographer");
      photographerEl.forEach((photographer) => {
        const photographerTags = Array.from(
          photographer.querySelectorAll(".tag")
        ).map((element) => element.dataset.tag);
        const containSelectedTag = photographerTags.includes(
          e.target.dataset.tag
        );
        if (containSelectedTag) {
          photographer.style.display = "flex";
        } else {
          photographer.style.display = "none";
        }
      });
    });
  });
};
tagFilter();
