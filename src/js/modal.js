const refs = {
  overlay: document.querySelector('[data-overlay]'),
  modal: document.querySelector('div.modal'),
  modalIngrid: document.querySelector('.modal--ingrid'),
  learnMoreBtn: document.querySelectorAll('.btn--lm'),
};

export function onModalOpen() {
  refs.btnModalClose = document.querySelector('.modal .modal__close');
  refs.btnIngridient = document.querySelectorAll('.card__ingridients li');
  refs.overlay.classList.add('active');
  refs.modal.classList.remove('hidden');
  refs.modal.classList.add('active');
  refs.btnModalClose.addEventListener('click', onCloseButtonClick);
  refs.btnIngridient.forEach(li => {
    li.addEventListener('click', onModalOpenIngrids);
  });
}

function onCloseButtonClick() {
  console.log('try close modaLLLLL');
  refs.overlay.classList.remove('active');
  refs.modal.classList.add('hidden');
  refs.modal.classList.remove('active');
  //refs.btnCloseModal.removeEventListener('click', onCloseButtonClick);
}

export function onModalOpenIngrids() {
  refs.btnModalClose = document.querySelector('[data-modal-close-ingrid]');
  console.log(' refs.btnModalClose', refs.btnModalClose);
  refs.modalIngrid.classList.remove('hidden');
  refs.modalIngrid.classList.add('active');
  refs.btnModalClose.addEventListener('click', onCloseButtonIgridClick);
}

function onCloseButtonIgridClick() {
  console.log('try close modaLLLLL');
  refs.modalIngrid.classList.add('hidden');
  refs.modalIngrid.classList.remove('active');
  //refs.btnCloseModal.removeEventListener('click', onCloseButtonClick);
}
