import { variables } from '../utils/variables';
const toolTip = document.createElement('div');

/**
 * Tooltip event에서 사용할 image node 정보 array 생성
 *
 * @return imgtag의 node/alt/positionTop,positionLeft 담은 Array
 */

const getImageNodeData = () => {
  const imageNodes = document.querySelectorAll('img');
  const imageDataArr = [];
  imageNodes.forEach((element) => {
    const alt = element.alt.trim();
    if (alt) {
      const elementRect = element.getBoundingClientRect();
      const top = elementRect.top + window.scrollY;
      const left = elementRect.left + window.scrollX;
      imageDataArr.push({
        data: element,
        alt: alt,
        top: top,
        left: left,
      });
    }
  });
  return imageDataArr;
};
const imageNodes = getImageNodeData();

/**
 * Permanent Tooltip append
 *
 */
const addPermanent = (action) => {
  const targetElement = document.querySelector(
    `.hnAccbtn[data-action='${action}']`
  );
  targetElement.classList.add('active');
  for (let i = 0; i < imageNodes.length; i++) {
    const top = imageNodes[i].top;
    const left = imageNodes[i].left;
    const toolTip = document.createElement('div');
    toolTip.classList.add('hnToolTip');
    toolTip.innerText = imageNodes[i].alt;
    toolTip.style.display = '"inline-block';
    toolTip.style.top = top + 10 + 'px';
    toolTip.style.left = left + 10 + 'px';
    document.body.appendChild(toolTip);
  }
};

/**
 * removePermanent
 *
 */
const removePermanent = (action) => {
  const targetElement = document.querySelector(
    `.hnAccbtn[data-action='${action}']`
  );
  targetElement.classList.remove('active');
  const target = document.querySelectorAll('.hnToolTip');
  target.forEach((element) => element.parentNode.removeChild(element));
};

/**
 * applyMouseover
 *
 * @param {Event} MouseEvent
 */
const applyMouseover = (event) => {
  const accData = event.target.alt;
  const target = document.querySelectorAll('.hnToolTipMouse');
  target.forEach((element) => element.parentNode.removeChild(element));

  toolTip.classList.add('hnToolTipMouse');
  toolTip.innerText = accData;
  toolTip.style.display = '"inline-block';

  document.body.appendChild(toolTip);
};

/**
 * applyMousemove
 *
 * @param {Event} MouseEvent
 */
const applyMousemove = (event) => {
  toolTip.style.top = event.clientY + 10 + 'px';
  toolTip.style.left = event.clientX + 10 + 'px';
};

/**
 * applyMouseout
 *
 * @param {Event} MouseEvent
 */
const applyMouseout = (event) => {
  if ('IMG' == event.target.tagName) {
    const target = document.querySelectorAll('.hnToolTipMouse');
    target.forEach((element) => element.parentNode.removeChild(element));
  }
};

/**
 * addMouseEvent
 *
 */
const addMouseoverTooltip = (action) => {
  const targetElement = document.querySelector(
    `.hnAccbtn[data-action='${action}']`
  );
  targetElement.classList.add('active');
  for (let i = 0; i < imageNodes.length; i++) {
    imageNodes[i].data.addEventListener('mouseover', applyMouseover);
    imageNodes[i].data.addEventListener('mousemove', applyMousemove);
    imageNodes[i].data.addEventListener('mouseout', applyMouseout);
  }
};

/**
 * removeMouseEvent
 *
 */
const removeMouseoverTooltip = (action) => {
  const targetElement = document.querySelector(
    `.hnAccbtn[data-action='${action}']`
  );
  targetElement.classList.remove('active');
  for (let i = 0; i < imageNodes.length; i++) {
    imageNodes[i].data.removeEventListener('mouseover', applyMouseover);
    imageNodes[i].data.removeEventListener('mousemove', applyMousemove);
    imageNodes[i].data.removeEventListener('mouseout', applyMouseout);
  }
};

/**
 * Tooltip localDataObj적용
 *
 * @param {Event} clickEvent
 */
const handleTooltipEvent = (event) => {
  event.preventDefault();
  if (event.target.dataset.action) {
    const dataAction = event.target.dataset.action;
    variables.localDataObj[dataAction] = !variables.localDataObj[dataAction];
    setTooltip(dataAction);
  }
};

/**
 * Tooltip 액션을 체크 후 이벤트 적용
 *
 * @param {string} 액션 타입
 */
export const setTooltip = (action) => {
  if (action === 'tooltip-mouseover') {
    const data = variables.localDataObj[action];
    data ? addMouseoverTooltip(action) : removeMouseoverTooltip(action);
  }
  if (action === 'tooltip-permanent') {
    const data = variables.localDataObj[action];
    data ? addPermanent(action) : removePermanent(action);
  }
};

/**
 * initTooltipEvent
 *
 */
export const initTooltipEvent = () => {
  const tooltipActionButton = document.getElementById('tooltips');
  tooltipActionButton.addEventListener('click', handleTooltipEvent, false);
};
