const input = document.querySelector('.datalist__input');
const letters = document.querySelector('#letters');

input.onfocus = function () {
  letters.style.display = 'block';
  input.style.borderRadius = '5px 5px 0 0';
};
for (let option of letters.options) {
  option.onclick = function () {
    input.value = option.value;
    letters.style.display = 'none';
    input.style.borderRadius = '5px';
  };
}

input.oninput = function () {
  currentFocus = -1;
  var text = input.value.toUpperCase();
  for (let option of letters.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  }
};
let currentFocus = -1;
input.onkeydown = function (e) {
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(letters.options);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(letters.options);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      /*and simulate a click on the "active" item:*/
      if (letters.options) letters.options[currentFocus].click();
    }
  }
};

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add('active');
}
function removeActive(x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('active');
  }
}
