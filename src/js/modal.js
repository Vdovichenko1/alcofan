const refs = {
  overlay: document.querySelector('[data-overlay]'),
  modal: document.querySelector('div.modal'),
  modalIngrid: document.querySelector('.modal--ingrid'),
  learnMoreBtn: document.querySelectorAll('.btn--lm'),
};

let scroll = 0;

export function onModalOpen() {
  scroll = scrollY;
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

function onCloseButtonClick() {
  refs.overlay.classList.remove('active');
  refs.modal.classList.add('hidden');
  refs.modal.classList.remove('active');
  document.body.classList.remove('fixed');
  window.scrollTo(0, scroll);
  refs.btnCloseModal.removeEventListener('click', onCloseButtonClick);
}

export function onModalOpenIngrids() {
  refs.btnModalClose = document.querySelector('[data-modal-close-ingrid]');
  refs.overlay.style.zIndex = 5;
  refs.modalIngrid.classList.remove('hidden');
  refs.modalIngrid.classList.add('activeF');
  refs.btnModalClose.addEventListener('click', onCloseButtonIgridClick);
}

function onCloseButtonIgridClick() {
  refs.overlay.style.zIndex = 3;
  refs.modalIngrid.classList.add('hidden');
  refs.modalIngrid.classList.remove('activeF');
  //refs.btnCloseModal.removeEventListener('click', onCloseButtonClick);
}

function getBodyScrollTop() {
  return (
    window.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (document.body && document.body.scrollTop)
  );
}
