import { createMarkUpCards } from './markup';

// export function getData(number) {
//   const arrayOfPromise = [];
//   for (let i = 1; i <= number; i++) {
//     fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         console.log('response -  ', response);
//         return response.json();
//       })
//       .then(data => {
//         console.log('dtd -  ', data.drinks);
//         console.log(createMarkUpCards(data.drinks));
//       })
//       .catch(error => {
//         console.log('error   --->   ', error);
//       });
//   }
// }
export async function getData(number) {
 console.log('ЁЁЁЁЁ  создаю карточки', number);
  try {
    for (let i = 1; i <= number; i++) {
        const drink = await fetchDrinks(number);
      console.log('drink.drinks  =///=== ', drink.drinks);
      createMarkUpCards(drink.drinks);
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function fetchDrinks(number) {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  );
  return await response.json();
}
