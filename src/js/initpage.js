import { loadLocalStorage } from './localStorage';
import { htmlElements } from './start';
import { getData } from './fetch';

export let favoritDrinks = {};
export let favoriteIngredients = {};

 const KEY_LOCAL_STORAGE_THEME = 'theme';
 const KEY_LOCAL_STORAGE_FAVORITE_DRINKS = 'favorit_drinks';
 const KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS = 'favorite_ingredients';

const arrayLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const arrayNumeral = '1234567890'.split('');

const ref = {
  alphabet: document.querySelector('.ABC-picker'),
  numbers: document.querySelector('.numbers-picker'),
  select: document.querySelector('.select-picker'),
};
export function initPage() {

  ref.alphabet.innerHTML = arrayLetters
    .map(item => `<li>${item}</li>`)
    .join('');
  ref.numbers.innerHTML = arrayNumeral.map(item => `<li>${item}</li>`).join('');
  ref.select.innerHTML =
    `<select class="select">` +
    [...arrayLetters, ...arrayNumeral]
      .map(item => `<option value="${item}">${item}<option>`)
      .join('') +
    `</select>`;

  // темная и светлая тема
  // const theme = loadLocalStorage(KEY_LOCAL_STORAGE_THEME);
  // htmlElements.inputDarkAndLightTheem.checked = theme;
  // document.body.className = theme ? 'light' : 'dark';
  // любиміе напитки из хранилища
  if (loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS)) {
    favoritDrinks = loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS);
  }
  console.log('опросил локалсторедж = favoritDrinks', favoritDrinks);
  // любиміе ингридиенты из хранилища
  if (loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS)) {
    favoriteIngredients = loadLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS);
  }
  console.log('опросил локалсторедж favoriteIngredients = ', favoriteIngredients);

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
  console.log("нужні новіе карточки", entries.length)
  getData(entries.length);
  observerForLoad.unobserve(entries[0].target);
 
});
