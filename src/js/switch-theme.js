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

const initPage = () => {
  const savedChecked = load(THEME_STORAGE_KEY);

  inputRef.checked = savedChecked;
  document.body.className = savedChecked ? Theme.DARK : Theme.LIGHT;
};

initPage();

const onThemeSwitch = event => {
  const { checked } = event.target;

  document.body.className = checked ? Theme.DARK : Theme.LIGHT;
  save(THEME_STORAGE_KEY, checked);
};

inputRef.addEventListener('change', onThemeSwitch);
