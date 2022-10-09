import { initPage } from './initpage';
import { getNumberElement } from './initpage';
import { getData } from './fetch';


export const htmlElements = {
  listOfDrinks: document.querySelector('.gallery'),
  leter: document.querySelector('.ABC-picker'),
  number: document.querySelector('.numbers-picker'),
  select: document.querySelector('.select-picker'),
};

initPage();

htmlElements.leter.addEventListener('click', handlerChoice);
htmlElements.number.addEventListener('click', handlerChoice);
htmlElements.select.addEventListener('change', handlerChoice);
document.addEventListener('keydown', handlerChoice);

function handlerChoice(e) {
  let key;
  console.log(e);
  switch (e.type) {
    case 'click':
      if ((e.target.nodeName = 'LI')) key = e.target.textContent;
      break;
    case 'keydow':
      if (
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(e.key) ||
        '1234567890'.includes(e.key)
      )
        key = e.key;
      break;
    case 'change':
      key = e.target.value;
      break;
    default:
      return;
    }
     getData(getNumberElement(), key); // у меня нет запроса под key
}
