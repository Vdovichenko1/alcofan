export const refs = {
  btnRef: document.querySelector('[data-menu-button]'),
  menu: document.querySelector('[data-menu]'),
  logo: document.querySelector('.logo'),
};

refs.btnRef.addEventListener('click', onOpenBurger);

function onOpenBurger() {
  const expanded =
    refs.btnRef.getAttribute('aria-expanded') === 'true' || false;

  refs.btnRef.classList.toggle('is-open');
  refs.btnRef.setAttribute('aria-expanded', !expanded);
  refs.logo.classList.remove('logo-burger');
  refs.menu.classList.toggle('is-open');
}
