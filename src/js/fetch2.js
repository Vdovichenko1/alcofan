import { createMarkUpCards } from './markup';
import { createMarkUpIngridients } from './markupingridients';
import FetchService from './backend.js';

const fetchService = new FetchService();

//рандомное количество карточек
export async function getCards(number) {
  console.log('ЁЁЁЁЁ  создаю карточки', number);
  try {
    const coctails = await fetchService.randomCoctailsOnStart(number);
    createMarkUpCards(coctails, {
      add: true,
      h1Change: 'Cocktails',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], {
      add: false,
      h1Change: '',
    });
  }
}
// массив карточек по первой букве
export async function getCardsFirstLetter(key) {
  console.log('создаю карточки = ', key);
  try {
    const response = await fetchService.byLetterCoctail(key);
    createMarkUpCards(response, {
      add: false,
      h1Change: 'Searching results',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], {
      add: false,
      h1Change: '',
    });
  }
}
// массив карточек по имени коктейля
export async function getCardsByName(key) {
  console.log('создаю карточки = ', key);
  try {
    const response = await fetchService.byNameCoctail(key);
    createMarkUpCards(response, {
      add: false,
      h1Change: 'Searching results',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// массив карточек: любиміе коктейли пользователя
export async function getCardsByFavoritDrinks(arrayDrinks) {
  console.log('arrayDrinks drinks = ', arrayDrinks);
  try {
    const coctails = await fetchService.favoriteCoctailsById(arrayDrinks);
    createMarkUpCards(coctails, {
      add: false,
      h1Change: 'Favorite cocktails',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// карточка ингридиента по имени
export async function getCardsByIngridient(key) {
  console.log('создаю карточки = ', key);
  try {
    const response = fetchService.byIdCoctail(key);
    createMarkUpIngridients(response, {
     display: 'modal',
    h1Change: '',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpIngridients([], { add: false, h1Change: '' });
  }
}
// массив карточек: любиміе ингридиенті пользователя
export async function getCardsByFavoritIngridient(arrayIngridients) {
  console.log('arrayIngridient = ', arrayIngridients);
  try {
    const ingridients = await fetchService.favoriteIngrById(arrayIngridients);
    createMarkUpIngridients(ingridients, {
      display: 'list',
      h1Change: 'Favorite ingredients',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpIngridients([], { add: false, h1Change: '' });
  }
}