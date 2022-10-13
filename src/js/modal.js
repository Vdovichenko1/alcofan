const refs = {
  overlay: document.querySelector('[data-overlay]'),
  modal: document.querySelector('div.modal'),
  learnMoreBtn: document.querySelectorAll('.btn--lm'),
};
console.log('refs =', refs);
export function onModalOpen() {
  refs.btnModalClose = document.querySelector('.modal .modal__close');
  console.log(' refs.btnModalClose', refs.btnModalClose);
  refs.overlay.classList.add('active');
  refs.modal.classList.remove('hidden');
  refs.modal.classList.add('active');
  refs.btnModalClose.addEventListener('click', onCloseButtonClick);
}

function onCloseButtonClick() {
  console.log('try close modaLLLLL');
  refs.overlay.classList.remove('active');
  refs.modal.classList.add('hidden');
  refs.modal.classList.remove('active');
  //refs.btnCloseModal.removeEventListener('click', onCloseButtonClick);
}
