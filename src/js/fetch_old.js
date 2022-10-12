import { createMarkUpCards } from './markup';
import { createMarkUpIngridients } from './markupingridients';
// export function getData(number) {
//   const arrayOfPromise = [];
//   for (let i = 1; i <= number; i++) {
//     fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         console.log('response -  ', response);
//         return response.json();
//       })
//       .then(data => {
//         console.log('dtd -  ', data.drinks);
//         console.log(createMarkUpCards(data.drinks));
//       })
//       .catch(error => {
//         console.log('error   --->   ', error);
//       });
//   }
// }

//рандомное количество карточек
export async function getCards(number) {
  console.log('создаю карточки', number);
  try {
    const arrayPromise = [];
    for (let i = 1; i <= number; i++) {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      );
      const data = await response.json();
      arrayPromise.push(data);
    }
    const data = await Promise.all(arrayPromise);
    const coctails = data.map(coctail => coctail.drinks[0]);
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
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${key}`
    );
    const drink = await response.json();

    createMarkUpCards(drink.drinks, {
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
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`
    );
    const drink = await response.json();
    createMarkUpCards(drink.drinks, {
      add: false,
      h1Change: `Searching results by string ${key}`,
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
    const arrayPromise = [];
    for (let i of arrayDrinks) {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${i}`
      );
      const data = await response.json();
      arrayPromise.push(data);
    }
    const data = await Promise.all(arrayPromise);
    const coctails = data.map(coctail => coctail.drinks[0]);
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
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${key}`
    );
    const drink = await response.json();
    console.log(drink.ingredients);
    createMarkUpIngridients(drink.ingredients, {
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
    const arrayPromise = [];
    for (let i of arrayIngridients) {
      
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`
      );
      const data = await response.json();
      arrayPromise.push(data);
    }
    const data = await Promise.all(arrayPromise);
console.log(` await Promise.all(arrayPromise) `, data);
    const ingridients = data.map(i => i.ingredients[0]);
     console.log('ingridients = ', ingridients);
    createMarkUpIngridients(ingridients, {
      display: 'list',
      h1Change: 'Favorite ingredients',
    });
  } catch (error) {
    console.log(error.message);
    createMarkUpIngridients([], { add: false, h1Change: '' });
  }
}

export async function getList(urlEnd, htmlElements) {
  console.log('создаю спиок по  = ', urlEnd);
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?${urlEnd}`
    );
    const list = await response.json();
    console.log(list.drinks);
    htmlElements.innerHTML = list.drinks.map(
      item =>
        `<option value="${Object.values(item)[0]}">${
          Object.values(item)[0]
        }</option>`
    ).join('');
  } catch (error) {
    console.log(error.message);
    htmlElements.innerHTML = '';
  }
}
// массив карточек по имени категории коктейля
export async function getCardsByСategory(category) {
  console.log('создаю карточки = ', category);
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const drink = await response.json();
    console.log(drink.drinks);
    const arrayID = drink.drinks.map(item => item.idDrink);
     console.log(arrayID);
     getCardsByFavoritDrinks(
       arrayID,
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
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`
    );
    const drink = await response.json();
    console.log(drink.drinks);
    const arrayID = drink.drinks.map(item => item.idDrink);
    console.log(arrayID);
    getCardsByFavoritDrinks(arrayID, `Searching results by glass: ${glass}`);
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}
// массив карточек по ингридиенту
export async function getCardsByIngredient(Ingredient) {
  console.log('создаю карточки = ', Ingredient);
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredient}`
    );
    const drink = await response.json();
    console.log(drink.drinks);
    const arrayID = drink.drinks.map(item => item.idDrink);
    console.log(arrayID);
    getCardsByFavoritDrinks(
      arrayID,
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
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${Alcoholic}`
    );
    const drink = await response.json();
    console.log(drink.drinks);
    const arrayID = drink.drinks.map(item => item.idDrink);
    console.log(arrayID);
    getCardsByFavoritDrinks(
      arrayID,
      `Searching results by alcoholic: ${Alcoholic}`
    );
  } catch (error) {
    console.log(error.message);
    createMarkUpCards([], { add: false, h1Change: '' });
  }
}