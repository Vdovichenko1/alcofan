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
      h1Change: `Searching results by first symbol ${key}`,
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
      h1Change: `Searching results: cocktails by string ${key}`,
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// массив карточек: любиміе коктейли пользователя
export async function getCardsByFavoritDrinks(arrayDrinks, h1 = 'Favorite cocktails') {
  console.log('arrayDrinks drinks = ', arrayDrinks);
  try {
   const coctails = await fetchService.favoriteCoctailsById(arrayDrinks);
    createMarkUpCards(coctails, {
      add: false,
      h1Change: h1,
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
    const response = await fetchService.byIngrName(key);
    createMarkUpIngridients(response, {
      display: 'modal',
      h1Change: `Searching results: ingridients by string ${key}`,
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

// -------------------------------------------------------------------------------------------------------------

export async function getList(urlEnd, htmlElements) {
  console.log('создаю спиок по  = ', urlEnd);
  try {
    const list = await fetchService.fetchList(urlEnd);
    htmlElements.innerHTML = list
      .map(
        item =>
          `<option value="${Object.values(item)[0]}">${
            Object.values(item)[0]
          }</option>`
      )
      .join('');
  } catch (error) {
    console.log(error.message);
    htmlElements.innerHTML = '';
  }
}
// массив карточек по имени категории коктейля
export async function getCardsByСategory(category) {
  console.log('создаю карточки = ', category);
  try {
    const response = await fetchService.fetchByCategory(category);
    getCardsByFavoritDrinks(
      response,
      `Searching results by category: ${category}`
    );
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// массив карточек по стакану
export async function getCardsByGlass(glass) {
  console.log('создаю карточки = ', glass);
  try {
    const response = await fetchService.fetchByGlass(glass);
    getCardsByFavoritDrinks(response, `Searching results by glass: ${glass}`);
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// массив карточек по ингридиенту
export async function getCardsByIngredient(Ingredient) {
  console.log('создаю карточки = ', Ingredient);
  try {
    const response = await fetchService.fetchByIngr(Ingredient);
    getCardsByFavoritDrinks(
      response,
      `Searching results by ingredient: ${Ingredient}`
    );
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// массив карточек по наличию алкголя в коктейле
export async function getCardsByselectByAlcoholic(Alcoholic) {
  console.log('создаю карточки = ', Alcoholic);
  try {
    const response = await fetchService.fetchByAlcohol(Alcoholic);
    getCardsByFavoritDrinks(
      response,
      `Searching results by alcoholic: ${Alcoholic}`
    );
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
