import { variables } from '../utils/variables';

/**
 * 로컬스토리지에 값을 적용
 *
 * @param {string} 액션 타입
 * @param {string} 적용 되어야하는 +/-연산자
 * @param {number} 변동되는 값
 * @param {string} 값 단위
 * @param {number} null값
 */
const setReadableData = (property, symbols, value, unit, defaultNum) => {
  const targetLocalData = variables.localDataObj['current-' + property];
  const calcValue =
    targetLocalData === null
      ? defaultNum + parseInt(symbols + value, 10)
      : targetLocalData + parseInt(symbols + value, 10);
  const localValue = calcValue === 0 || calcValue === 100 ? null : calcValue;
  variables.localDataObj['current-' + property] = localValue;
  setReadableStyle(property, unit);
};

/**
 * 변동되어야하는 readable 타입과 값, 단위를 구한다
 *
 * @param {string} 액션 타입
 * @param {string} 적용 되어야하는 +/-연산자
 * @param {number} 변동되는 값
 * @param {string} 값 단위
 */
const getReadableValue = (property, symbols) => {
  let value;
  let unit;
  let defaultNum;
  if (property === 'font-size' || property === 'line-height') {
    value = 10;
    unit = '%';
    defaultNum = 100;
  } else if (property === 'letter-spacing' || property === 'word-spacing') {
    value = 1;
    unit = 'px';
    defaultNum = 0;
  }
  setReadableData(property, symbols, value, unit, defaultNum);
};

/**
 * readable 액션을 체크한다
 *
 * @param {Event} MouseEvent
 */
const handleReadableEvent = (event) => {
  event.preventDefault();
  if (event.target.dataset.action) {
    const dataAction = event.target.dataset.action;
    if (dataAction.includes('increase')) {
      const property = dataAction.replace('-increase', '');
      getReadableValue(property, '+');
    } else if (dataAction.includes('decrease')) {
      const property = dataAction.replace('-decrease', '');
      getReadableValue(property, '-');
    }
  }
};
/**
 * add Readable css style tag
 *
 * @param {string}
 * @param {string}
 */
export const setReadableStyle = (property, unit) => {
  const value = variables.localDataObj['current-' + property];
  const targetElement = variables.toolbar.querySelector(
    `*[data-info=${property}]`
  );
  targetElement.querySelector('.currentValue').innerText = value;
  if (value === null) {
    targetElement.classList.remove('active');
    const style = document.getElementById('hn-acc-' + property);
    if (style) {
      style.remove();
    }
    targetElement.querySelector('.currentValue').innerText = '-';
    return false;
  } else {
    targetElement.classList.add('active');
  }
  const css =
    'hn-acc.hn-style { ' + property + ':' + value + unit + ' !important }';
  const body = document.body || document.getElementsByTagName('body')[0];
  let style = document.getElementById('hn-acc-' + property);
  if (!style) {
    style = document.createElement('style');
    style.id = 'hn-acc-' + property;
    style.type = 'text/css';
    body.appendChild(style);
  }
  style.innerHTML = '';
  style.appendChild(document.createTextNode(css));
};

/**
 * initReadableEvent
 *
 */
export const initReadableEvent = () => {
  const readableButton = document.getElementById('readable');
  readableButton.addEventListener('click', handleReadableEvent, false);
};
