import { favoritDrinks, favoriteIngredients } from './initpage';
import { htmlElements } from './start';
import { observerForAmination, observerForLoad } from './initpage';
import { saveLocalStorage } from './localStorage';
import { KEY_LOCAL_STORAGE_FAVORITE_DRINKS } from './initpage';
import { KEY_LOCAL_STORAGE_FAVORITE_INGREDIENTS } from './initpage';

export function createMarkUpCards(arrOfDrinks) {
  const htmlStrings = arrOfDrinks.map(el => {
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
        sringIng += `<li>${el[`strIngredient${i}`]}</li>`;
      } else {
        sringIng += `<li>${
          el[`strMeasure${i}`] + ' ' + el[`strIngredient${i}`]
        }</li>`;
      }
    }
    return `<li class="card"><img class="card__img"src="${el.strDrinkThumb}"alt="${el.strDrink}" loading="lazy"/><div class="card__meta"><h3 class="card__title">${el.strDrink}</h3><ul class=card__ingridients>${sringIng}</ul><p class=card__instruction>${el.strInstructions}</p><div class="card__buttons"><button class="btn btn--lm" type="button">Learn more</button><button class="${myClass}" type="button" data-id="${el.idDrink}">${myTextContent}<svg class="btn__icon" width="20" height="20"><use href="#"></use></svg></button></div></div></li>`;
  });

  console.log('htmlStrings  ', htmlStrings);

  htmlElements.listOfDrinks.insertAdjacentHTML(
    'beforeend',
    htmlStrings.join('')
  );
  document
    .querySelectorAll('.card')
    .forEach(i => observerForAmination.observe(i));
  observerForLoad.observe(document.querySelector('.card:last-child'));

  document.querySelectorAll('.btn-add').forEach(item => {
    item.addEventListener('click', newChooseDrink);
  });
}

function newChooseDrink(e) {
  const element = e.currentTarget;
  const id = String(element.dataset.id);
  console.log('id in favoritDrinks', id, id in favoritDrinks);

  if (id in favoritDrinks) {
    delete favoritDrinks[id];
    element.textContent = 'Add to';
    element.className = 'drink__choice';
  } else {
    favoritDrinks[id] = true;
    element.textContent = 'Remove';
    element.className = 'drink__choice  done';
  }
  saveLocalStorage(KEY_LOCAL_STORAGE_FAVORITE_DRINKS, favoritDrinks);
  console.log('favoritDrinks', favoritDrinks);
}
// for (let i of arrOfDrinks) {
//   let temporerry = i.drinks[0];

//   const objDrink = {};

//   objDrink.idDrink = temporerry.idDrink;
//   objDrink.name = temporerry.strDrink;
//   objDrink.instruction = temporerry.strInstructions;
//   // objDrink.ingriditents = [];
// for (let i = 1; i <= 15; i++) {
//   if (
//     item.drinks[0][`strIngredient${i}`] === '' ||
//     item.drinks[0][`strIngredient${i}`] === null
//   )
//     continue;
//   drink.ingriditents.push(
//     item.drinks[0][`strMeasure${i}`] +
//     ' ' +
//     item.drinks[0][`strIngredient${i}`]
//   );

//   // console.log('q = ', item.drinks[0][`strMeasure${i}`]);
//   // console.log('? = ', item.drinks[0][`strIngredient${i}`]);
// }
// console.log(' objDrink == ', objDrink);

//console.log('objDrink   =///=== ', objDrink);
//     let myClass = '';
//     let myTextContent = '';
//     if (idDrink in favoritDrinks) {
//       myTextContent = 'Remove';
//       myClass = 'drink__choice  done';
//     } else {
//       myTextContent = 'Add to';
//       myClass = 'drink__choice';
//     }
//     return `<li class="card">
//         <img src="${strDrinkThumb}" alt="${strDrink}" class="drink__img"/><h3 class="drink__name">${strDrink}</h3><div class="drink__buttons"><span class="drink__leamMore"> Learn more</span><span class="${myClass}" data-ID="${idDrink}">${myTextContent}</span></div></li>`;
//   });
// console.log('=====', htmlElements.listOfDrinks);
//  htmlElements.listOfDrinks.insertAdjacentHTML('beforeend', arrOfCards.join(''));
//  // htmlElements.listOfDrinks.innerHTML = arrOfCards.join('');
//   return arrOfCards.join('');
