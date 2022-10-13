import { handlerFavoritIngridients, handlerFavoritCoctails } from './start';
export const refs = {
  btnRef: document.querySelector('[data-menu-button]'),
  menu: document.querySelector('[data-menu]'),
  logo: document.querySelector('.logo'),
  switch: document.querySelector('.theme-switch'),
  search: document.querySelector('.search-form'),
  favoritCock: document.querySelector(
    '.dropdown__link.dropdown__link-coctails'
  ),
  favoritIngr: document.querySelector(
    '.dropdown__link.dropdown__link-ingridients'
  ),
};
refs.favoritIngr.addEventListener('click', e => {
  onOpenBurger();
  handlerFavoritIngridients();
});
refs.favoritCock.addEventListener('click', e => {
  onOpenBurger();
  handlerFavoritCoctails();
});
refs.btnRef.addEventListener('click', onOpenBurger);

function onOpenBurger() {
  const expanded =
    refs.btnRef.getAttribute('aria-expanded') === 'true' || false;

  refs.btnRef.classList.toggle('is-open');
  refs.btnRef.setAttribute('aria-expanded', !expanded);
  refs.logo.classList.remove('logo-burger');
  refs.menu.classList.toggle('is-open');
  refs.switch.classList.toggle('switch-burger');
  refs.search.classList.toggle('search-burger');
}
