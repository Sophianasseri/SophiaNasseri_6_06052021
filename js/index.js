//Bouton passer au contenu
const mainLink = document.querySelector(".main-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    mainLink.style.display = "inline";
  } else {
    mainLink.style.display = "none";
  }
});

//Tags

const photographerId = document.querySelectorAll(".photographer");

const tags = (tag) => {
  for (let i = 0; i < photographerId.length; i++) {
    if (photographerId[i].dataset.tags.includes(tag)) {
      photographerId[i].style.display = "flex";
    } else {
      photographerId[i].style.display = "none";
    }
  }
};

const portraitTag = document.querySelectorAll("#portrait");

for (let i = 0; i < portraitTag.length; i++) {
  portraitTag[i].addEventListener("click", () => {
    tags("portrait");
  });
}
const artTag = document.querySelectorAll("#art");

for (let i = 0; i < artTag.length; i++) {
  artTag[i].addEventListener("click", () => {
    tags("art");
  });
}
const fashionTag = document.querySelectorAll("#fashion");

for (let i = 0; i < fashionTag.length; i++) {
  fashionTag[i].addEventListener("click", () => {
    tags("fashion");
  });
}
const architectureTag = document.querySelectorAll("#architecture");

for (let i = 0; i < architectureTag.length; i++) {
  architectureTag[i].addEventListener("click", () => {
    tags("architecture");
  });
}
const travelTag = document.querySelectorAll("#travel");

for (let i = 0; i < travelTag.length; i++) {
  travelTag[i].addEventListener("click", () => {
    tags("travel");
  });
}
const sportTag = document.querySelectorAll("#sport");

for (let i = 0; i < sportTag.length; i++) {
  sportTag[i].addEventListener("click", () => {
    tags("sport");
  });
}
const animalsTag = document.querySelectorAll("#animals");

for (let i = 0; i < animalsTag.length; i++) {
  animalsTag[i].addEventListener("click", () => {
    tags("animals");
  });
}
const eventsTag = document.querySelectorAll("#events");

for (let i = 0; i < eventsTag.length; i++) {
  eventsTag[i].addEventListener("click", () => {
    tags("events");
  });
}
