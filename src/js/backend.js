import axios from 'axios';

axios.defaults.baseURL = 'https://www.thecocktaildb.com/api/';

export default class FetchService {
  constructor() {
    this.searchQuery = '';
    this.letter = '';
    this.idCoctail = '';
    this.idIngridient = '';
    // this.page = 1;
  }

  // incrementPage() {
  //   this.page += 1;
  // }
  // resetPage() {
  //   this.page = 1;
  // }
  // get query() {
  //   return this.searchQuery;
  // }
  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // }

  async randomCoctail() {
    const url = 'json/v1/1/random.php';   /*Один коктейль random*/
    const response = await axios.get(url);
    console.log(response.data.drinks[0]);
    return response.data.drinks[0];

  }

  async byNameCoctail() {
        console.log('по имени');
        const url = `json/v1/1/search.php?s=${this.searchQuery}`;
        const response = await axios.get(url);
        this.ifNoCoctails(response.data.drinks);
        console.log(response.data.drinks);
        return response.data.drinks;
  }

  async byLetterCoctail() {
    console.log('по букве');
    const url = `json/v1/1/search.php?f=${this.letter}`;
    const response = await axios.get(url);
    this.ifNoCoctails(response.data.drinks);
    console.log(response.data.drinks);
    return response.data.drinks;
  }

  async byIdCoctail(id = this.idCoctail) {
    console.log('по ID');
    const url = `json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(url);
    if(!response.data.ingredients) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(response.data.drinks[0]);
    return response.data.drinks[0];
  }

  async byIdIngridient(id = this.idCoctail) {
    console.log('Ингридиенты по ID');
    const url = `json/v1/1/lookup.php?iid=${id}`;
    const response = await axios.get(url);
    if(!response.data.ingredients) {
      console.log("Sorry we didn't find any coctails");
      return;
    }
    console.log(response.data.ingredients[0]);
    return response.data.ingredients[0];
  }
  ifNoCoctails(check) {
    if(!check) {
      console.log("Sorry we didn't find any coctails");
    }
  }

}

// const fetchService = new FetchService();

// fetchService.searchQuery = 'margarita';
// fetchService.letter = 'm';
// fetchService.idCoctail = '16311';
// fetchService.idIngridient = '552';

// fetchService.randomCoctail();
// fetchService.byIdCoctail('163115'); 
// fetchService.byIdIngridient();
// fetchService.byLetterCoctail();
// fetchService.byNameCoctail();



// Работа c Localhost

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



// Разметка нескольких карточек

// const testClick = document.querySelector('.theme-switch__control');
// testClick.addEventListener('click', onTestClick);
// fetchService.searchQuery = 'margarita';
// async function onTestClick() {
//   const response = await fetchService.byNameCoctail();
//   renderImages(response);
// }

// function renderImages(prm) {
//   console.log('PRM',prm);
//   const markup = prm
//     .map(
//       image =>
//         (image = `
//             <div class="thumb">            
//             <img src="${image.strDrinkThumb}" alt="" loading="lazy"  />
//             </div>
//           `)
//     )
//     .join('');
//   document.body.insertAdjacentHTML('beforeend', markup);
// }



// Разметка одной карточки

// const testClick = document.querySelector('.js-button');
// testClick.addEventListener('click', onTestClick);
// async function onTestClick() {
//   const response = await fetchService.randomCoctail();
//   renderImage(response);
// }

// function renderImage(prm) {
//     const markup = `
//               <div class="thumb">            
//               <img src="${prm.strDrinkThumb}" alt="" loading="lazy"  />
//               </div>
//             `;
//     document.body.insertAdjacentHTML('beforeend', markup);
//   }
