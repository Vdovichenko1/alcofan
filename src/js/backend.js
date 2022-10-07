import axios from 'axios';

axios.defaults.baseURL = 'https://www.thecocktaildb.com/api/';
export default class FetchService {
  constructor() {
    this.searchQuery = '';
    this.letter = '';
    // this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async onFetchCoctail() {
    
    
    if(this.searchQuery) {
        console.log('по имени');
        const url = `json/v1/1/search.php?s=${this.searchQuery}`;
        const response = await axios.get(url);
        console.log(response.data.drinks);
        return response.data.drinks;
    }

    if(this.letter) {
        console.log('по букве');
        const url = `json/v1/1/search.php?f=${this.letter}`;
        const response = await axios.get(url);
        console.log(response.data.drinks);
        return response.data.drinks;
    }

    const url = 'json/v1/1/random.php';   /*Один коктейль random*/
    const response = await axios.get(url);
    console.log(response.data.drinks[0]);
    return response.data.drinks;
  }

//   randomNineCoctails() {
//     for (let index = 0; index < 9; index += 1) {
//         this.onFetchCoctail();
//     }
   
//   }

  



}

const fetchService = new FetchService();
fetchService.searchQuery = 'margarita';
// fetchService.letter = 'm';
fetchService.onFetchCoctail();