const refs = {
  btnModalClose: document.querySelector('[data-modal-close]'),
  overlay: document.querySelector('[data-overlay]'),
  modal: document.querySelector('[data-modal]'),
  learnMoreBtn: document.querySelectorAll('.btn--lm'),
};
refs.learnMoreBtn.forEach(button => {
  button.addEventListener('click', onCloseButtonClick);
});

function onModalOpen(e) {
  refs.overlay.classList.add('active');
  refs.modal.classList.add('active');
  refs.btnModalClose.addEventListener('click', onCloseButtonClick);
}

function onCloseButtonClick(e) {
  refs.overlay.classList.remove('active');
  refs.modal.classList.remove('active');
  refs.btnCloseModal.removeEventListener('click', onCloseButtonClick);
}
