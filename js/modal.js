/* eslint-disable import/extensions */
import { fetchPhotographer, pageId } from './functions.js';

// Générer modale dynamiquement

let photographerData = [];

const modal = document.querySelector('.modal');

const createModal = async () => {
  photographerData = await fetchPhotographer();
  const getPhotographerId = photographerData.find((element) => element.id === parseInt(pageId, 10));
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
                <small></small>
              </div>
              <div class="form-data">
                <label for="last">Nom</label>
                <input type="text" id="last" name="last" />
                <small></small>
              </div>
              <div class="form-data">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" />
                <small></small>
              </div>
              <div class="form-data">
                <label for="message">Votre message</label>
                <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                ></textarea>
                <small></small>
              </div>
              <input type="submit" value="Envoyer" class="btn contact-btn" />
          </form>
  `;
};
createModal();

// Ouvrir et fermer la modale

const modaldisplay = async () => {
  await createModal();
  const modalBtn = document.querySelector('.modal-btn');
  const closeBtn = document.querySelector('#close-modal');
  const modalBg = document.querySelector('.modal-background');

  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    modalBg.style.display = 'block';
  });
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalBg.style.display = 'none';
  });
};
modaldisplay();

// Validation formulaire
const validateForm = async () => {
  await modaldisplay();
  const modalBg = document.querySelector('.modal-background');
  const form = document.getElementById('contact');
  const firstNameEl = document.getElementById('first');
  const lastNameEl = document.getElementById('last');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');

  const isrequired = (value) => (value !== '');

  const showError = (input, message) => {
    const parentEl = input.parentElement;
    input.classList.add('error');

    const error = parentEl.querySelector('small');
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const parentEl = input.parentElement;
    input.classList.remove('error');
    const error = parentEl.querySelector('small');
    error.textContent = '';
  };
  const checkFirstName = () => {
    let valid = false;
    const value = firstNameEl.value.trim();

    if (!isrequired(value)) {
      showError(firstNameEl, 'Veuillez entrer un prénom');
    } else if (value.length < 2) {
      showError(firstNameEl, 'Veillez entrer 2 caractères minimum');
    } else {
      valid = true;
      showSuccess(firstNameEl);
    }
    return valid;
  };
  const checkLastName = () => {
    let valid = false;
    const value = lastNameEl.value.trim();
    if (!isrequired(value)) {
      showError(lastNameEl, 'Veuillez entrer un nom');
    } else if (value.length < 2) {
      showError(lastNameEl, 'Veillez entrer 2 caractères minimum');
    } else {
      showSuccess(lastNameEl);
      valid = true;
    }
    return valid;
  };
  const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

  const checkEmail = () => {
    let valid = false;
    const value = emailEl.value.trim();
    if (!isrequired(value)) {
      showError(emailEl, 'Veuillez entrer un e-mail');
    } else if (!value.match(emailValid)) {
      showError(emailEl, 'Veillez entrer un e-mail valide');
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const checkMessage = () => {
    let valid = false;
    const value = messageEl.value.trim();
    if (!isrequired(value)) {
      showError(messageEl, 'Ce champ ne peut être vide');
    } else {
      showSuccess(messageEl);
      valid = true;
    }
    return valid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstNameValidation = checkFirstName();
    const lastNameValidation = checkLastName();
    const emailValidation = checkEmail();
    const messageValidation = checkMessage();

    const formValidation = firstNameValidation
      && lastNameValidation
      && emailValidation
      && messageValidation;

    if (formValidation) {
      modal.style.display = 'none';
      modalBg.style.display = 'none';
      form.reset();
    }
  });

  form.addEventListener('input', (e) => {
    switch (e.target.id) {
      case 'first':
        checkFirstName();
        break;
      case 'last':
        checkLastName();
        break;
      case 'email':
        checkEmail();
        break;
      case 'message':
        checkMessage();
        break;
      default:
    }
  });
};

validateForm();
