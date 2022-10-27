import { variables } from '../utils/variables';

/**
 * target action localDataObj 값 처리
 *
 * @param {Event} mouseClickEvent
 */
const handleColorModeClick = (event) => {
  event.preventDefault();
  if (event.target.dataset.action) {
    const dataAction = event.target.dataset.action;
    variables.localDataObj[dataAction] = !variables.localDataObj[dataAction];
    setColorMode(dataAction);
  }
};

/**
 * colorMode style 적용
 *
 * @param {string} data.action
 */
export const setColorMode = (action) => {
  const dataAction = `.hnAccbtn[data-action='${action}']`;
  const target = document.querySelector(dataAction);
  const html = document.querySelector('html');
  const resultClass = `hn-color-${action}`;
  const bool = variables.localDataObj[action];

  if (bool) {
    html.classList.add(resultClass);
    target.classList.add('active');
  } else {
    html.classList.remove(resultClass);
    target.classList.remove('active');
  }
};

/**
 * initColorEvent
 *
 */
export const initColorEvent = () => {
  const fontColorActionButton = document.getElementById('colorMode');
  fontColorActionButton.addEventListener('click', handleColorModeClick, false);
};
