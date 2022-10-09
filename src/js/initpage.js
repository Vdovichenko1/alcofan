import { loadLocalStorage } from './localStorage';
import { htmlElements } from './start';
import { getData } from './fetch';
import FetchService from './backend';

export let favoritDrinks = {};
export let favoriteIngredients = {};
export const fetchService = new FetchService();

export const KEY_LOCAL_STORAGE_THEME = 'theme';
export const KEY_LOCAL_STORAGE_FAVORITE_DRINKS = 'favorit_drinks';
export const KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS = 'favorite_ingredients';

const arrayLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const arrayNumeral = '1234567890'.split('');

const ref = {
  alphabet: document.querySelector('.ABC-picker'),
  numbers: document.querySelector('.numbers-picker'),
  select: document.querySelector('.datalist'),
};
export function initPage() {
  ref.alphabet.innerHTML = [...arrayLetters, ...arrayNumeral]
    .map(
      item => `<li class="hero__letter">${item}</li>
    `
    )
    .join('');

  ref.select.innerHTML =
    `<select class="select">` +
    [...arrayLetters, ...arrayNumeral]
      .map(
        item => `<option class="datalist__option" value="${item}">${item}</option>
      `
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
  console.log(
    'опросил локалсторедж favoriteIngredients = ',
    favoriteIngredients
  );
  console.log("запросил данные = ", fetchService.randomCoctailsOnStart(2));
  console.log(favoriteIngredients, favoritDrinks, getNumberElement());
  console.log(getNumberElement());

  getData(getNumberElement());
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
  { rootMargin: '0px' }
);

export const observerForLoad = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  console.log('нужні новіе карточки', entries.length);
  getData(entries.length);
  observerForLoad.unobserve(entries[0].target);
});
