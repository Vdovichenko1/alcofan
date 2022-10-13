import { favoritDrinks, favoriteIngredients } from './initpage';
import { htmlElements } from './start';
import { observerForAmination, observerForLoad } from './initpage';
import { saveLocalStorage } from './localStorage';
import { KEY_LOCAL_STORAGE_FAVORITE_DRINKS } from './initpage';
import { KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS } from './initpage';

export function createMarkUpIngridients(arrOfIngridients, param) {
  console.log('hello', arrOfIngridients);
  let htmlStrings = [];
  const h1 = document.querySelector('h1.section__title');
  if (arrOfIngridients.length === 0) {
    htmlElements.listOfDrinks.innerHTML = `<div class="card-error"> <span class="card-error__text">Sorry, we didn't find any cocktail for you</span> <div class="card-error__img"></div></div>`;
    return;
  } else {
    htmlStrings = arrOfIngridients.map(el => {
      let myClass = '';
      let myTextContent = '';
      if (el.idIngredient in favoriteIngredients) {
        myTextContent = 'Remove';
        myClass = 'btn-add ingridient done';
      } else {
        myTextContent = 'Add to';
        myClass = 'btn-add ingridient';
      }

      const myStr = `<div class="card-ingridient">
      <h3 class="card-ingridient__head">${el.strIngredient}</h3><p class="card-ingridient__type">${el.strType}</p><p class="card-ingridient__description">${el.strDescription}</p>
          <ul>
            <li>Type: Unknow</li>
            <li>Country of origin: Unknow</li>
            <li>Alcohol by volume: Unknow</li>
            <li>Flavour: Unknow</li>
          </ul>
          <div class="card__buttons">
            <button class="btn btn--lm" type="button">
              Learn more
            </button>
            <button class="${myClass}" type="button" data-id="${el.idIngredient}">
              ${myTextContent}
              <svg class="btn__icon" width="20" height="20">
                <use href="#"></use>
              </svg>
            </button>
          </div>
        </div>`;

      return myStr;
    });
  }
  console.log('param.display', param.display);
  if (param.display === 'modal') {
    console.log(
      'document.querySelector',
      document.querySelector('.modal.modal--ingrid')
    );
    document.querySelector('.modal.modal--ingrid').innerHTML =
      htmlStrings.join('');

    ////  теперь тут НАДО ОТКРІТЬ МОДАЛКУ ИНГРИДИЕНТОВ
    //// поднять какую либо функцию типа onCloseMODALWINDOW


    
  } else if (param.display === 'list') {
    h1.innerHTML = param.h1Change;
    htmlElements.listOfDrinks.innerHTML = htmlStrings.join('');
  }

  //   document
  //     .querySelectorAll('.card-ingridient')
  //     .forEach(i => observerForAmination.observe(i));

  //observerForLoad.observe(document.querySelector('.card:last-child'));

  document.querySelectorAll('.btn-add.ingridient').forEach(item => {
    item.addEventListener('click', newChooseIngridient);
  });
  document.querySelectorAll('.btn.btn--lm').forEach(item => {
    item.addEventListener('click', showMoreAboutIngridient);
  });
}

function newChooseIngridient(e) {
  const element = e.currentTarget;
  const id = String(element.dataset.id);
  console.log('id in favoritDrinks', id, id in favoritDrinks);

  if (id in favoriteIngredients) {
    delete favoriteIngredients[id];
    element.textContent = 'Add to';
    element.className = 'btn-add ingridient';
  } else {
    favoriteIngredients[id] = true;
    element.textContent = 'Remove';
    element.className = 'btn-add  done';
  }
  saveLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS, favoriteIngredients);
  console.log('favoritDrinks', favoritDrinks);
}
function showMoreAboutIngridient(e) {
  const modalWindow = document.querySelector('.modal.modal--ingrid');
 modalWindow.innerHTML = e.currentTarget.closest('.card-ingridient').innerHTML;
  modalWindow
    .querySelector('.btn-add.ingridient')
    .addEventListener('click', newChooseIngridient);
}
