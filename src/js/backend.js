import axios from 'axios';

axios.defaults.baseURL = 'https://www.thecocktaildb.com/api/';

export default class FetchService {
  constructor() {
    this.searchQuery = '';
    this.letter = '';
    this.idCoctail = '';
    this.ingName = '';
    this.idIngr = '';
    this.ings = {};
  }
  
  /*Один коктейль random*/
  async randomCoctail() {
    const url = 'json/v1/1/random.php'; 
    const response = await axios.get(url);
    console.log(response.data.drinks[0]);
    return response.data.drinks[0];
  }

  /* массив объектов коктейлей рандом*/
  async randomCoctailsOnStart(number = 9) { 
    const coctailsPr = [];
    const url = 'json/v1/1/random.php';
    for (let index = 0; index < number; index += 1) {
      coctailsPr.push(axios.get(url));
    }
    const data = await Promise.all(coctailsPr);
    const coctails = data.map(coctail => coctail.data.drinks[0]);
    console.log(coctails);
    return coctails; 
  }

  /*поиск по имени, вернет массив объектов коктейлей*/
  async byNameCoctail(query = this.searchQuery) { 
    console.log('по имени');
    if (!query) {
      console.log('Enter searchQuery');
      return;
    }
    const url = `json/v1/1/search.php?s=${query.trim()}`;
    const response = await axios.get(url);
    const drinks = response.data.drinks;
    if (!drinks) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(drinks);
    return drinks;
  }

  /* поиск по первой букве, массив объектов коктейлей */
  async byLetterCoctail(query = this.letter) { 
    console.log('по букве');
    if (!query) {
      console.log('Enter searchQuery');
      return;
    }
    const url = `json/v1/1/search.php?f=${query}`;
    const response = await axios.get(url);
    const drinks = response.data.drinks;
    if (!drinks) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(drinks);
    return drinks;
  }

  /*поиск по ID коктейля, вернет объект коктейля */
  async byIdCoctail(id = this.idCoctail) {  
    console.log('по ID');
    console.log('ID', id);
    const url = `json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(url);
    if (!response.data.drinks) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(response.data.drinks[0]);
    return response.data.drinks[0];
  }

  /*поиск по имени ингредиента, вернет объект описания ингредиента */
  async byIngrName(ing = this.ingName) { 
    console.log('Описание ингридиента по имени');
    const url = `json/v1/1/search.php?i=${ing}`;
    const response = await axios.get(url);
    if (!response.data.ingredients) {
      console.log("Sorry we didn't find any Ingredients");
      return;
    }
    console.log(response.data.ingredients);
    return response.data.ingredients;
  }

  /*поиск по ID ингредиента, вернет объект описания ингредиента */
  async byIngridientId(id = this.idIngr) {
    console.log('Ингридиент по ID ингридиента');
    const url = `json/v1/1/lookup.php?iid=${id}`;
    const response = await axios.get(url);
    if (!response.data.ingredients) {
      console.log("Sorry we didn't find any Ingredients");
      return;
    }
    console.log(response.data.ingredients[0]);
    return response.data.ingredients[0];
  }
  /* Favorite coctails ожидает массив ID коктейлей , возвращает массив обьектов коктейлей */
    async favoriteCoctailsById(arIdDrinks) { 
    const arrayPromise = [];
    for (let idDrink of arIdDrinks) {
      const url = `json/v1/1/lookup.php?i=${idDrink}`;
      arrayPromise.push(axios.get(url));
    }
    const data = await Promise.all(arrayPromise);
    const coctails = data.map(coctail => coctail.data.drinks[0]);
    console.log(coctails);
    return coctails; 
  }

  /* Favorite coctails ожидает массив ID ингрединта , возвращает массив обьектов коктейлей */
  async favoriteIngrById(arIdIngr) { 
    const arrayPromise = [];
    for (let idIngr of arIdIngr) {
      const url = `json/v1/1/lookup.php?iid=${idIngr}`;
      arrayPromise.push(axios.get(url));
    }
    const data = await Promise.all(arrayPromise);
    const coctails = data.map(ingredient => ingredient.data.ingredients[0]);
    console.log(coctails);
    return coctails; 
  }

  /* Запишет в массив ингредиенты коктейля из объекта коктейля*/
  fetchIngredients(obj = this.ings) {     //получает объект drink {}
    const ingAr = [];
    for (let index = 1; index < 16; index += 1) {
      const el = obj[`strIngredient${index}`];
      if (!el) {
        break;
      }
      ingAr.push(el);
    }
    console.log(ingAr);
    return ingAr; //массив ингридиентов
  }

  async fetchByCategory(category) { 
    const url = `json/v1/1/filter.php?c=${category}`;
    const drink = await axios.get(url);
    console.log('CATEGORY', drink.data.drinks);
    const arrayID = drink.data.drinks.map(item => item.idDrink);
    console.log(arrayID);
    return arrayID;
  }

  async fetchByGlass(glass) { 
    const url = `json/v1/1/filter.php?g=${glass}`;
    const drink = await axios.get(url);
    console.log('GLASS',drink);
    const arrayID = drink.data.drinks.map(item => item.idDrink);
    return arrayID;
  }

  async fetchByIngr(ing) { 
    const url = `json/v1/1/filter.php?i=${ing}`;
    const drink = await axios.get(url);
    console.log(drink.data.drinks);
    const arrayID = drink.data.drinks.map(item => item.idDrink);
    console.log(arrayID);
    return arrayID;
  }

  async fetchByAlcohol(ing) { 
    const url = `json/v1/1/filter.php?a=${ing}`;
    const drink = await axios.get(url);
    console.log(drink.data.drinks);
    const arrayID = drink.data.drinks.map(item => item.idDrink);
    console.log(arrayID);
    return arrayID;
  }

  async fetchList(i) {
    const url = `json/v1/1/list.php?${i}`;
    const response = await axios.get(url);
    return response.data.drinks;
  }



}



// const fetchService = new FetchService();
// document.body.innerHTML = '';

// fetchService.randomCoctailsOnStart(); // Ожидает число, возврашает  массив объектов (по дефолту вернет 9 рандомных коктейлей)

// fetchService.byNameCoctail('margarita'); // Ожидает строку, возврашает массив объектов коктейлей
// fetchService.byLetterCoctail('m'); // Ожидает первую букву, возврашает массив объектов коктейлей
// fetchService.byIdCoctail(12654); // Ожидает IDкоктейля, возврашает объект коктейля
// fetchService.byIngrName('lemon'); // Ожидает имя ингр, возврашает объект одного ингредиента с описанием
// fetchService.byIngridientId(299); //Ожидает номер ингр, возврашает объект одного ингредиента с описанием

// fetchService.fetchIngredients(obj); // Ожидает объект коктейл, возвращает массив ингредиентов
// fetchService.favoriteCoctailsById(['12091','17066']);
// fetchService.favoriteIngrById([299,299,299]);


// document.body.insertAdjacentHTML('beforeend', '<button class="test-button">Test button</button>');
// document.body.insertAdjacentHTML('beforeend', '<div class="js-box"></div>');
// const testDiv = document.querySelector('.js-box');

// // 9 random coctails

// const testClick = document.querySelector('.test-button');
// testClick.addEventListener('click', onTestClick);

// async function onTestClick() {
//   const response = await fetchService.randomCoctailsOnStart();
//   renderCoctailsAll(response);
//   testDiv.addEventListener('click', onLearnMore)
// }

// // // Render markup 9 coctails

// function renderCoctailsAll(prm) {
//   const markup = prm
//     .map(
//       image =>
//         (image = `
//             <div class="thumb">
//             <img src="${image.strDrinkThumb}" alt="" loading="lazy" />
//             </div>
//             <button type="button" class="js-learn-more" data-id="${image.idDrink}">Learn more</button>
//           `)
//     )
//     .join('');
//     testDiv.innerHTML = markup;
// }

// // // Render markup 1 coctail

// function renderCoctail(prm) {
//   fetchService.ings = prm;
//   const ingredients = fetchService.fetchIngredients();
//     const markup = `
//               <div class="thumb">
//               <img src="${prm.strDrinkThumb}" alt="" loading="lazy"  />
//               <p>Name: ${prm.strDrink}</p>
//               <p>Alcohol: ${prm.strAlcoholic}</p>
//               <p>Category: ${prm.strCategory}</p>
//               <p>Ingredients: ${ingredients.join(', ')}</p>
//               <p>Instructions: ${prm.strInstructions}</p>
//               </div>
//             `;
//             testDiv.insertAdjacentHTML('beforebegin', markup);
//   }

//   async function onLearnMore(evt) {
//     const response = await fetchService.byIdCoctail(evt.target.dataset.id);
//     renderCoctail(response);

//     }


// // Ingredients

// async function onTestIngredients() {
//   const response = await fetchService.byIdCoctail(12654);
  
//   console.log(fetchService.fetchIngredients(response));
// }
// onTestIngredients();



// Работа c Localstorage

// async function saveMessage() {
// const byId = await fetchService.byIdCoctail('16311');
// localStorage.setItem('COCTAIL', JSON.stringify(byId));
// }
// saveMessage();

// function loadMessage() {
//   const load =JSON.parse(localStorage.getItem('COCTAIL'));
// console.log('favorite',load);
// }
// loadMessage();








//Архив

// async byLetterCoctail(number, query = this.letter) {
  //   console.log('по букве');
  //   if (!query) {
  //     console.log('Enter searchQuery');
  //     return;
  //   }
  //   const url = `json/v1/1/search.php?f=${query}`;
  //   const response = await axios.get(url);
  //   const drinks = response.data.drinks;
  //   if (!drinks) {
  //     console.log("Sorry we didn't find any coctails");
  //     return;
  //   }
  //   console.log(drinks.slice(0, number));
  //   console.log(`${number} dinks`);
  //   return drinks.slice(0, number);
  // }

    // async byNameCoctail(number, query = this.searchQuery) {
  //   console.log('по имени');
  //   if (!query) {
  //     console.log('Enter searchQuery');
  //     return;
  //   }
  //   const url = `json/v1/1/search.php?s=${query.trim()}`;
  //   const response = await axios.get(url);
  //   const drinks = response.data.drinks;
  //   if (!drinks) {
  //     console.log("Sorry we didn't find any coctails");
  //     return;
  //   }
  //   console.log(drinks.slice(0, number));
  //   console.log(`${number} dinks`);
  //   return drinks.slice(0, number);
  // }





// Работа c Localstorage

// async function saveMessage() {
// const byId = await fetchService.byIdCoctail('16311'); 
// localStorage.setItem('COCTAIL', JSON.stringify(byId));
// }
// saveMessage();

// function loadMessage() {
//   const load =JSON.parse(localStorage.getItem('COCTAIL'));
// console.log('favorite',load);
// }
// loadMessage();
