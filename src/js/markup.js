import { favoritDrinks, favoriteIngredients } from './initpage';
import { htmlElements } from './start';
import { observerForAmination, observerForLoad } from './initpage';
import { saveLocalStorage } from './localStorage';
import { KEY_LOCAL_STORAGE_FAVORITE_DRINKS } from './initpage';
import { KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS } from './initpage';
import { getCardsByIngridient } from './fetch';

export function createMarkUpCards(arrOfDrinks, param) {
  let htmlStrings = [];
  const h1 = document.querySelector('h1.section__title');
  if (arrOfDrinks.length === 0) {
    htmlElements.listOfDrinks.innerHTML = `<div class="card-error"> <span class="card-error__text">Sorry, we didn't find any cocktail for you</span> <div class="card-error__img"></div></div>`;
    h1.innerHTML = '';
    return;
  } else {
    htmlStrings = arrOfDrinks.map(el => {
      let myClass = '';
      let myTextContent = '';
      if (el.idDrink in favoritDrinks) {
        myTextContent = 'Remove';
        myClass = 'btn-add  done';
      } else {
        myTextContent = 'Add to';
        myClass = 'btn-add';
      }
      let sringIng = '';
      for (let i = 1; i <= 15; i++) {
        if (el[`strIngredient${i}`] === null) break;
        if (el[`strMeasure${i}`] === null) {
          sringIng += `<li data-ingridient="${el[`strIngredient${i}`]}"> ${
            el[`strIngredient${i}`]
          }</li>`;
        } else {
          sringIng += `<li data-ingridient="${el[`strIngredient${i}`]}"> ${
            el[`strMeasure${i}`]
          } ${el[`strIngredient${i}`]}</li>`;
        }
      }

      return `<li class="card"><img class="card__img" src="${el.strDrinkThumb}"alt="${el.strDrink}" loading="lazy"/><div class="card__meta"><h3 class="card__title">${el.strDrink}</h3><ul class=card__ingridients>${sringIng}</ul><p class=card__instruction>${el.strInstructions}</p><div class="card__buttons"><button class="btn btn--lm" type="button">Learn more</button><button class="${myClass}" type="button" data-id="${el.idDrink}">${myTextContent}<svg class="btn__icon" width="20" height="20"><use href="#"></use></svg></button></div></div></li>`;
    });
  }

  h1.innerHTML = param.h1Change ? param.h1Change : '';

  if (param.add) {
    htmlElements.listOfDrinks.insertAdjacentHTML(
      'beforeend',
      htmlStrings.join('')
    );
    observerForLoad.observe(document.querySelector('.card:last-child'));
  } else {
    htmlElements.listOfDrinks.innerHTML = htmlStrings.join('');
  }

  document
    .querySelectorAll('.card')
    .forEach(i => observerForAmination.observe(i));

  document.querySelectorAll('.btn-add').forEach(item => {
    item.addEventListener('click', newChooseDrink);
  });
  document.querySelectorAll('.btn.btn--lm').forEach(item => {
    item.addEventListener('click', showMoreAboutCoctail);
  });
  document.querySelectorAll('.card__ingridients li').forEach(item => {
    item.addEventListener('click', openIngridient);
  });
}

function newChooseDrink(e) {
  const element = e.currentTarget;
  const id = String(element.dataset.id);
  console.log('id in favoritDrinks', id, id in favoritDrinks);

  if (id in favoritDrinks) {
    delete favoritDrinks[id];
    element.textContent = 'Add to';
    element.className = 'btn-add';
  } else {
    favoritDrinks[id] = true;
    element.textContent = 'Remove';
    element.className = 'btn-add  done';
  }
  saveLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS, favoritDrinks);
  console.log('favoritDrinks', favoritDrinks);
}

function openIngridient(e) {
  console.log(e.currentTarget.dataset.ingridient);
  getCardsByIngridient(e.currentTarget.dataset.ingridient);
}
function showMoreAboutCoctail(e) {
  document.querySelector('.modal_cocktail').innerHTML =
    e.currentTarget.closest('.card').innerHTML;
}
