import { loadLocalStorage } from './localStorage';
import { htmlElements } from './start';
import { getCards } from './fetch';
//import { FetchService } from './backend';

export let favoritDrinks = {};
export let favoriteIngredients = {};
//export const fetchService = new FetchService();

export const KEY_LOCAL_STORAGE_THEME = 'theme';
export const KEY_LOCAL_STORAGE_FAVORITE_DRINKS = 'favorit_drinks';
export const KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS = 'favorite_ingredients';

const arrayLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const arrayNumeral = '1234567890'.split('');

export function initPage() {
  document.querySelector('.ABC-picker').innerHTML = [
    ...arrayLetters,
    ...arrayNumeral,
  ]
    .map(item => `<li class="hero__letter">${item}</li>`)
    .join('');

  document.querySelector('.datalist').innerHTML =
    `<select class="select">` +
    [...arrayLetters, ...arrayNumeral]
      .map(
        item =>
          `<option class="datalist__option" value="${item}">${item}</option>`
      )
      .join('') +
    `</select>`;

  if (loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS)) {
    favoritDrinks = loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS);
  }
  console.log('опросил локалсторедж = favoritDrinks', favoritDrinks);
  // любиміе ингридиенты из хранилища
  if (loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS)) {
    favoriteIngredients = loadLocalStorage(
      KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS
    );
  }
  console.log('favoriteIngredients = ', favoriteIngredients);
  console.log('кол-во карточек', getNumberElement());

  getCards(getNumberElement());
}
export function getNumberElement() {
  const windowWidth = window.innerWidth;
  let amountDrinks = 0;
  if (windowWidth < 768) {
    amountDrinks = 3;
  } else if (windowWidth < 1268) {
    amountDrinks = 6;
  } else {
    amountDrinks = 9;
  }
  return amountDrinks;
}
export const observerForAmination = new IntersectionObserver(
  entries => {
    entries.forEach(element => {
      if (element.isIntersecting) {
        element.target.classList.add('show');
      } else {
        element.target.classList.remove('show');
      }
    });
  },
  { rootMargin: '-100px' }
);
