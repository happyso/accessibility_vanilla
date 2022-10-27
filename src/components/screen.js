import { variables } from '../utils/variables';

/**
 * applyRuler
 *
 * @param {Event} mousemoveEvent
 */
const applyRuler = (event) => {
  const ruler = document.querySelector('.hnScreenRuler');
  ruler.style.display = 'block';
  ruler.style.top = event.clientY + 50 + 'px';
};

/**
 * applyMask
 *
 * @param {Event} mousemoveEvent
 */
const applyMask = (event) => {
  const screenTop = document.querySelector('.hnMaskScreenTop');
  const screenButtom = document.querySelector('.hnMaskScreenBottom');
  screenTop.style.display = 'block';
  screenButtom.style.display = 'block';
  screenTop.style.height = event.clientY - 100 + 'px';
  screenButtom.style.top = event.clientY + 100 + 'px';
};

/**
 * applyMask
 *
 * @param {Event} mousemoveEvent
 */
const handleScreenEvent = (event) => {
  event.preventDefault();
  if (event.target.dataset.action) {
    const dataAction = event.target.dataset.action;
    variables.localDataObj[dataAction] = !variables.localDataObj[dataAction];
    setScreen(dataAction);
  }
};

/**
 * removeMask
 *
 */
const removeMask = () => {
  document.querySelector('.hnMaskScreenTop').removeAttribute('style');
  document.querySelector('.hnMaskScreenBottom').removeAttribute('style');
  document.removeEventListener('mousemove', applyMask);
};

/**
 * removeRuler
 *
 */
const removeRuler = () => {
  document.querySelector('.hnScreenRuler').removeAttribute('style');
  document.removeEventListener('mousemove', applyRuler);
};

/**
 * setScreen
 *
 * @param {string} 액션 타입
 */
export const setScreen = (action) => {
  const targetElement = document.querySelector(
    `.hnAccbtn[data-action='${action}']`
  );
  if (action === 'mask') {
    const data = variables.localDataObj[action];
    if (data) {
      document.addEventListener('mousemove', applyMask);
      targetElement.classList.add('active');
    } else {
      removeMask();
      targetElement.classList.remove('active');
    }
  }
  if (action === 'ruler') {
    const data = variables.localDataObj[action];
    if (data) {
      document.addEventListener('mousemove', applyRuler);
      targetElement.classList.add('active');
    } else {
      removeRuler();
      targetElement.classList.remove('active');
    }
  }
};

/**
 * initScreenEvent
 *
 */
export const initScreenEvent = () => {
  const screenActionButton = document.getElementById('screenSettings');
  screenActionButton.addEventListener('click', handleScreenEvent, false);
};
