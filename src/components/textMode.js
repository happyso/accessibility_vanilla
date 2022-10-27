import { variables } from '../utils/variables';

/**
 * PlainMode localDataObj적용
 *
 * @param {Event} clickEvent
 */
const handlePlainModeClick = (event) => {
  event.preventDefault();
  if (event.target.dataset.action) {
    const dataAction = event.target.dataset.action;
    variables.localDataObj[dataAction] = !variables.localDataObj[dataAction];
    setPlainText(dataAction);
  }
};

/**
 * Apply PlainText
 *
 * @param {string} action
 */
export const setPlainText = (action) => {
  let plainMode = variables.localDataObj[action];
  const target = document.querySelector(`.hnAccbtn[data-action='${action}']`);
  if (plainMode) {
    for (let i = 0; i < variables.styleSheets.length; i++) {
      variables.styleSheets[i].disabled = true;
    }
    target.classList.add('active');
  } else {
    for (let i = 0; i < variables.styleSheets.length; i++) {
      variables.styleSheets[i].disabled = false;
    }
    target.classList.remove('active');
  }
};

/**
 * initTextModeEvent
 *
 */
export const initTextModeEvent = () => {
  const textModeActionButton = document.getElementById('textMode');
  textModeActionButton.addEventListener('click', handlePlainModeClick, false);
};
