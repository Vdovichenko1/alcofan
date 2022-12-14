import { favoritDrinks, favoriteIngredients } from './initpage';
import { htmlElements } from './start';
import { observerForAmination, observerForLoad } from './initpage';
import { saveLocalStorage } from './localStorage';
import { KEY_LOCAL_STORAGE_FAVORITE_DRINKS } from './initpage';
import { KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS } from './initpage';
import { onModalOpenIngrids } from './modal';
import { btnIcon } from './markup';

const modalCloseIngred = document.querySelector('.modal__close-icon-ingred');
try {
  modalCloseIngred.remove();
  modalCloseIngred.style.display = '';
} catch (error) {
  console ("что то пошло не так")
}
modalCloseIngred.remove();
modalCloseIngred.style.display = '';

export function createMarkUpIngridients(arrOfIngridients, param) {
  console.log('hello', arrOfIngridients);
  let htmlStrings = [];
  const h1 = document.querySelector('h1.section__title');
  if (arrOfIngridients.length === 0) {
    htmlElements.listOfDrinks.innerHTML = `<div class="card-error">
    <span class="card-error__text">Sorry, we didn't find any cocktail for you</span>
    <div class="card-error__img"></div></div>`;
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
      <h3 class="card-ingridient__head">${el.strIngredient}</h3>
      <p class="card-ingridient__type">${el.strType}</p>
      <p class="card-ingridient__description">${el.strDescription}</p>
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
              ${myTextContent} ${btnIcon.outerHTML}
            </button>
          </div>
        </div>`;

      return myStr;
    });
  }
  console.log('param.display', param.display);
  if (param.display === 'modal') {
    const modalIngdidient = document.querySelector('.modal.modal--ingrid');
    modalIngdidient.innerHTML = `<button class="modal__close-ingred" type="button" data-modal-close-ingrid>
                      ${modalCloseIngred.outerHTML}
                    </button>`;
    modalIngdidient.insertAdjacentHTML('beforeend', htmlStrings.join(''));
   

    if (
      modalIngdidient.querySelector('.btn-add.ingridient').textContent ===
      'Add to'
    )
      modalIngdidient.querySelector('.btn-add.ingridient').textContent =
        'Add to favorite';
    if (
      modalIngdidient.querySelector('.btn-add.ingridient').textContent ===
      'Remove'
    )
      modalIngdidient.querySelector('.btn-add.ingridient').textContent =
        'Remove from favorite';
    
    modalIngdidient
      .querySelector('.btn-add.ingridient')
      .addEventListener('click', newChooseIngridient);

    onModalOpenIngrids();
  } else if (param.display === 'list') {
    h1.innerHTML = param.h1Change;
    htmlElements.listOfDrinks.innerHTML = htmlStrings.join('');
    document.querySelectorAll('.btn.btn--lm').forEach(item => {
      item.addEventListener('click', showMoreAboutIngridient);
      if (document.querySelector('.btn.btn--more')) {
        document.querySelector('.btn.btn--more').remove();
      }
    });
  }

  //   document
  //     .querySelectorAll('.card-ingridient')
  //     .forEach(i => observerForAmination.observe(i));

  //observerForLoad.observe(document.querySelector('.card:last-child'));

  document.querySelectorAll('.btn-add.ingridient').forEach(item => {
    item.addEventListener('click', newChooseIngridient);
  });

  // document.querySelectorAll('.card-ingridient  li').forEach(item => {
  //   item.addEventListener('click', showMoreAboutIngridient);
  // });
}

function newChooseIngridient(e) {
  const element = e.currentTarget;
  const id = String(element.dataset.id);
  console.log('id in favoritDrinks', id, id in favoritDrinks);

  if (id in favoriteIngredients) {
    delete favoriteIngredients[id];
    element.innerHTML = `Add to ${btnIcon.outerHTML}`;
    element.className = 'btn-add ingridient';
  } else {
    favoriteIngredients[id] = true;
    element.innerHTML = `Remove ${btnIcon.outerHTML}`;
    element.className = 'btn-add  done';
  }
  saveLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS, favoriteIngredients);
  console.log('favoritDrinks', favoritDrinks);
}
function showMoreAboutIngridient(e) {
  const modalWindow = document.querySelector('.modal.modal--ingrid');
  modalWindow.innerHTML = `<button class="modalclose" type="button" data-modal-close-ingrid>
                      ${modalCloseIngred.outerHTML}
                    </button>`;
  modalWindow.insertAdjacentHTML(
    'beforeend',
    e.currentTarget.closest('.card-ingridient').outerHTML
  );
 
  if (modalWindow.querySelector('.btn-add.ingridient').textContent === 'Add to')
    modalWindow.querySelector('.btn-add.ingridient').textContent.textContent =
      'Add to favorite';
  if (modalWindow.querySelector('.btn-add.ingridient').textContent === 'Remove')
    modalWindow.querySelector('.btn-add.ingridient').textContent.textContent =
      'Remove from favorite';
  modalWindow
    .querySelector('.btn-add.ingridient')
    .addEventListener('click', newChooseIngridient);

  onModalOpenIngrids();
}
