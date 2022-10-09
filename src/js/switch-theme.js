const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const THEME_STORAGE_KEY = 'theme';

const inputRef = document.querySelector('.theme-switch__toggle');
const textRef = document.querySelector('.theme-switch__text-white');
const textDark = document.querySelector('.theme-switch__text-black');
const textInput = document.querySelector('.search-form__input');
const navModal = document.querySelector('.nav__modal');

const initPage = () => {
  const savedChecked = load(THEME_STORAGE_KEY);
  inputRef.checked = savedChecked;
  document.body.className = savedChecked ? Theme.DARK : Theme.LIGHT;
};

initPage();

const onThemeSwitch = event => {
  const { checked } = event.target;
  if (checked) {
    textRef.style.color = '#FCFCFC';
    textDark.style.color = '#FD5103';
    textInput.style.color = '#ffffff';
    navModal.style.backgroundColor = '#202025';
  } else {
    textRef.style.color = '#FD5103';
    textDark.style.color = '#5F6775';
    textInput.style.color = '#202025';
    navModal.style.backgroundColor = '#ffffff';
  }

  document.body.className = checked ? Theme.DARK : Theme.LIGHT;
  save(THEME_STORAGE_KEY, checked);
};

inputRef.addEventListener('change', onThemeSwitch);
