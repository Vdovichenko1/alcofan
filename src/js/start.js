import { initPage } from './initpage';
import { refs } from './burger-menu';
import {
  getCardsFirstLetter,
  getCardsByName,
  getCardsByFavoritDrinks,
  getCardsByFavoritIngridient,
  getList,
  getCardsByСategory,
  getCardsByGlass,
  getCardsByIngredient,
  getCardsByselectByAlcoholic,
} from './fetch';
import { favoritDrinks, favoriteIngredients } from './initpage';

export const htmlElements = {
  listOfDrinks: document.querySelector('.gallery'),
  leter: document.querySelector('.ABC-picker'),
  select: document.querySelector('.datalist'),
  addFilters: document.querySelector('.wrapper'),
  search: document.querySelector('.search-form'),
  searchIntup: document.querySelector('.search-form__input'),
  favoritCoctails: document.querySelector('.dropdown__link.coctails'),
  favoritIngridients: document.querySelector('.dropdown__link.ingridients'),
  selectByCategory: document.querySelector('[name="select_by_category"]'),
  selectByGlass: document.querySelector('[name="select_by_glass"]'),
  selectByIngredient: document.querySelector('[name="select_by_ingredient"]'),
  selectByAlcoholic: document.querySelector('[name="select_by_alcoholic"]'),
};

initPage();
closeOpenFilter();

function closeOpenFilter() {
  if (htmlElements.addFilters.dataset.state === 'close') {
    htmlElements.addFilters.innerHTML = `Use more filters
        <img
          class="more__filters__icon"
          select
          src="./img/f+.png"
          alt="icon"
          style="width: 30px"
        />`;
    document.querySelector('.wrapper__filter').style.display = 'block';
    htmlElements.addFilters.dataset.state = 'open';
  } else if (htmlElements.addFilters.dataset.state === 'open') {
    htmlElements.addFilters.innerHTML = `Hide more filters
        <img
          class="more__filters__icon"
          select
          src="#"
          alt="icon"
          style="width: 30px"
        />`;
    htmlElements.addFilters.dataset.state = 'close';
    document.querySelector('.wrapper__filter').style.display = 'none';
  }
}
htmlElements.addFilters.addEventListener('click', closeOpenFilter);
htmlElements.leter.addEventListener('click', e =>
  getCardsFirstLetter(e.target.textContent)
);
htmlElements.select.addEventListener('change', e =>
  getCardsFirstLetter(e.target.value)
);
getList('c=list', htmlElements.selectByCategory);
getList('g=list', htmlElements.selectByGlass);
getList('i=list', htmlElements.selectByIngredient);
getList('a=list', htmlElements.selectByAlcoholic);

htmlElements.search.addEventListener('submit', e => {
  e.preventDefault();
  console.log(
    'тип поиска ',
    document.querySelector('[name="select_type_of_search"]').value
  );
  if (htmlElements.searchIntup.value === '') return;

  if (
    document.querySelector('[name="select_type_of_search"]').value ===
    'byCoctail'
  ) {
    console.log('byCoctail');
    getCardsByName(htmlElements.searchIntup.value);
  }
  if (
    document.querySelector('[name="select_type_of_search"]').value ===
    'byIngridient'
  ) {
    console.log('byIngridient');
    getCardsByIngredient(htmlElements.searchIntup.value);
  }
});

htmlElements.favoritCoctails.addEventListener('click', handlerFavoritCoctails);

htmlElements.favoritIngridients.addEventListener(
  'click',
  handlerFavoritIngridients
);

export function handlerFavoritIngridients() {
  document.querySelector('.section.hero').style.display = 'none';
  getCardsByFavoritIngridient(Object.keys(favoriteIngredients));
}
export function handlerFavoritCoctails() {
  document.querySelector('.section.hero').style.display = 'none';
  getCardsByFavoritDrinks(Object.keys(favoritDrinks));
}
htmlElements.selectByCategory.addEventListener('change', e =>
  getCardsByСategory(e.currentTarget.value)
);

htmlElements.selectByGlass.addEventListener('change', e =>
  getCardsByGlass(e.currentTarget.value)
);
htmlElements.selectByIngredient.addEventListener('change', e =>
  getCardsByIngredient(e.currentTarget.value)
);
htmlElements.selectByAlcoholic.addEventListener('change', e =>
  getCardsByselectByAlcoholic(e.currentTarget.value)
);
