export function loadLocalStorage (key){
  try {
    const valueLolcalStorege = localStorage.getItem(key);
    return valueLolcalStorege === null
      ? undefined
      : JSON.parse(valueLolcalStorege);
  } catch (error) {
    console.error('I am so sorry: ', error.message);
  }
};
export function saveLocalStorage (key, value){
   try {
     const valueLolcalStorege = JSON.stringify(value);
     localStorage.setItem(key, valueLolcalStorege);
   } catch (error) {
     console.error('I am so sorry: ', error.message);
   }
};