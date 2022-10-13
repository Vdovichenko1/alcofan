const refs = {
  overlay: document.querySelector('[data-overlay]'),
  modal: document.querySelector('div.modal'),
  modalIngrid: document.querySelector('.modal--ingrid'),
  learnMoreBtn: document.querySelectorAll('.btn--lm'),
};

let scroll = 0;

export function onModalOpen(e) {
  scroll = scrollY;
  window.addEventListener('keydown', escPress);
  refs.btnModalClose = document.querySelector('.modal .modal__close');
  refs.btnIngridient = document.querySelectorAll('.card__ingridients li');
  refs.overlay.classList.add('active');
  refs.modal.classList.remove('hidden');
  refs.modal.classList.add('active');
  refs.btnModalClose.addEventListener('click', onCloseButtonClick);
  refs.btnIngridient.forEach(li => {
    li.addEventListener('click', onModalOpenIngrids);
  });
  document.body.classList.add('fixed');
  document.body.dataset.scrollY = scroll;
  document.body.style.top = `-${document.body.dataset.scrollY}px`;
}

function onCloseButtonClick(e) {
  refs.overlay.classList.remove('active');
  refs.modal.classList.add('hidden');
  refs.modal.classList.remove('active');
  document.body.classList.remove('fixed');
  window.scrollTo(0, scroll);
  refs.btnModalClose.removeEventListener('click', onCloseButtonClick);
  window.removeEventListener('keydown', escPress);
}

export function onModalOpenIngrids(e) {
  window.addEventListener('keydown', escPress);
  refs.btnModalClose = document.querySelector('[data-modal-close-ingrid]');
  refs.overlay.style.zIndex = 5;
  refs.modalIngrid.classList.remove('hidden');
  refs.modalIngrid.classList.add('activeF');
  refs.btnModalClose.addEventListener('click', onCloseButtonIgridClick);
}

function onCloseButtonIgridClick(e) {
  refs.overlay.style.zIndex = 3;
  refs.modalIngrid.classList.add('hidden');
  refs.modalIngrid.classList.remove('activeF');
  refs.btnModalClose.removeEventListener('click', onCloseButtonIgridClick);
  window.removeEventListener('keydown', escPress);
}

// function escPress(event) {
//   console.log(event.code);
//   if (event.code === 'Escape') {
//     onCloseButtonClick();
//   }
// }

function escPress(event) {
  console.log(event.code);
  if (event.code === 'Escape') {
    if (refs.modalIngrid.classList.contains('activeF')) {
      onCloseButtonIgridClick();
      window.addEventListener('keydown', escPress);
      return;
    }

    onCloseButtonClick();
  }
}
