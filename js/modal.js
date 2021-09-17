import { pageId } from "./photographer.js";
import { fetchPhotographer } from "./functions.js";

//Générer modale dynamiquement

let photographerData = [];

const modal = document.querySelector(".modal");

const createModal = async () => {
  photographerData = await fetchPhotographer();
  const getPhotographerId = photographerData.find(
    (element) => element.id == pageId
  );
  modal.innerHTML = `
<form
              id="contact"
              name="contact"
              action="photographer.html"
              method="GET"
            >
              <div class="modal-header">
                <h1>Contactez-moi</h1>
                <i id="close-modal" class="fas fa-times"></i>
              </div>
              <h2>${getPhotographerId.name}</h2>
              <div class="form-data">
                <label for="first">Prénom</label>
                <input type="text" id="first" name="first" />
              </div>
              <div class="form-data">
                <label for="last">Nom</label>
                <input type="text" id="last" name="last" />
              </div>
            </form>
            <div class="form-data">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div class="form-data">
              <label for="message">Votre message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <input type="submit" value="Envoyer" class="btn contact-btn" />
`;
};
createModal();

//Ouvrir la modale

const modaldisplay = async () => {
  await createModal();
  const modalBtn = document.querySelector(".modal-btn");
  const closeBtn = document.querySelector("#close-modal");
  const modalBg = document.querySelector(".modal-background");

  modalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    modalBg.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalBg.style.display = "none";
  });
};
modaldisplay();
