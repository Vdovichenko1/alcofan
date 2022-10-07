// export class FetchService {
  
    //   constructor() {
    //     this.searchQuery = '';
    //     // this.page = 1;
    //   }
    
    //     // incrementPage() {
    //     //   this.page += 1;
    //     // }
    //     // resetPage() {
    //     //   this.page = 1;
    //     // }
    //     // get query() {
    //     //     return this.searchQuery;
    //     // }
    //     // set query(newQuery) {
    //     //   this.searchQuery = newQuery;
    //     // }
        
       
    // }
    
    const { default: axios } = require("axios");

    console.log('hello');
    async function onFetchPixabay() {
        console.log('запуск');
        // axios.defaults.baseURL = 'https://pixabay.com/api/';
        // const BASE_URL = 'https://pixabay.com/api/';
        // const KEY = '30339052-e4d079f5519c217cf05ffdccc';
        // const url = `?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const url = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
       
        const response = await axios.get(url);
      
      //   if (response.data.totalHits === 0) {
      //     Notify.failure(
      //       'Sorry, there are no images matching your search query. Please try again.'
      //     );
      //     throw new Error('no images');
      //   }
      // if (this.page === 1) {
      //     Notify.info(
      //     `Hooray! We found ${response.data.totalHits} images.`
      //   );
      // }
        console.log(response);
        // this.incrementPage();
        // return response.data.hits;
      
      }
      // const nf = new FetchService;
      
      onFetchPixabay();