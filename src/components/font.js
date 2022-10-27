import { variables } from '../utils/variables';
/**
 * font-family localDataObj적용
 *
 * @param {Event} clickEvent
 */
const handleFontClick = (event) => {
  event.preventDefault();
  if (event.target.dataset.action) {
    const dataAction = event.target.dataset.action;
    variables.localDataObj[variables.font] = dataAction;
    setFont(dataAction);
  }
};

/**
 * Apply font-family to body
 *
 * @param {string} action
 */
export const setFont = (action) => {
  const chooseFont = document.getElementById('chooseFont');
  const hnAccbtn = chooseFont.querySelectorAll('.hnAccbtn');
  const body = document.querySelector('body');
  const bodyClassList = body.className.split(' ');
  const checkClass = bodyClassList.filter((el) => {
    if (
      (' ' + el + ' ').replace(/[\n\t\r]/g, ' ').indexOf('hn-readable-fonts-') >
      -1
    ) {
      return true;
    }
    return false;
  });

  hnAccbtn.forEach((btn) => btn.classList.remove('active'));
  chooseFont
    .querySelector(`.hnAccbtn[data-action='${action}']`)
    .classList.add('active');

  if (checkClass) {
    checkClass.forEach((el) => {
      body.classList.remove(el);
    });
  }
  if (action === 'default') {
    return;
  }

  const result = 'hn-readable-fonts-' + action;
  body.classList.add(result);
};

/**
 * initFontEvent
 *
 */
export const initFontEvent = () => {
  const fontActionButton = document.getElementById('chooseFont');
  fontActionButton.addEventListener('click', handleFontClick, false);
};
