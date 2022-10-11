import { initPage } from './initpage';
import {
  getCardsFirstLetter,
  getCardsByName,
  getCardsByFavoritDrinks,
  getCardsByFavoritIngridient,
} from './fetch';
import { favoritDrinks, favoriteIngredients } from './initpage';

export const htmlElements = {
  listOfDrinks: document.querySelector('.gallery'),
  leter: document.querySelector('.ABC-picker'),
  select: document.querySelector('.datalist'),
  search: document.querySelector('.search-form'),
  searchIntup: document.querySelector('.search-form__input'),
  favoritCoctails: document.querySelector('.hero__text'), // заменить на линк-дроп
  favoritIngridients: document.querySelector('.hero__lable'), // заменить на линк-дроп
};
console.log(htmlElements);

initPage();

htmlElements.leter.addEventListener('click', e =>
  getCardsFirstLetter(e.target.textContent)
);
htmlElements.select.addEventListener('change', e =>
  getCardsFirstLetter(e.target.value)
);
// document.addEventListener('keydown', e => {
//   if (
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().includes(e.key) ||
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(e.key) ||
//     '1234567890'.includes(e.key)
//   )
//     getCardsFirstLetter(e.key);
//   return;
// });

htmlElements.search.addEventListener('submit', e => {
  e.preventDefault();
  console.log('htmlElements.searchIntup.value', htmlElements.searchIntup.value);
  if (htmlElements.searchIntup.value === '') return;
  getCardsByName(htmlElements.searchIntup.value);
});

htmlElements.favoritCoctails.addEventListener('click', e => {
  document.querySelector('.section.hero').style.display = "none"
  getCardsByFavoritDrinks(Object.keys(favoritDrinks));
});
htmlElements.favoritIngridients.addEventListener('click', e => {
  document.querySelector('.section.hero').style.display = 'none';
  getCardsByFavoritIngridient(Object.keys(favoriteIngredients));
});
