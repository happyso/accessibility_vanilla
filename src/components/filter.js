import { variables } from '../utils/variables';

import { setStatus } from './collapse';
/**
 * animationScroll
 *
 * @param {object} click_Element
 * @param {number} target_Offset_top
 * @param {number} current_scrollTop
 */
const animationScroll = (scrollElement, targetY, currentY) => {
  const duration = 600;
  const unitY = (targetY - currentY) / duration;
  const startTime = new Date().getTime();
  const endTime = new Date().getTime() + duration;

  const scrollTo = () => {
    let now = new Date().getTime();
    let passed = now - startTime;
    variables.isAnimated = true;
    if (now <= endTime) {
      scrollElement.scrollTop = currentY + unitY * passed;
      requestAnimationFrame(scrollTo);
    } else {
      variables.isAnimated = false;
    }
  };
  requestAnimationFrame(scrollTo);
};

/**
 * animationScroll init
 *
 * @param {object} element
 * @param {object} targetNodes
 */
const handleScrollEvent = (el, nodeArr) => {
  const thisNodes = nodeArr;
  const targetLink = el.getAttribute('data-position');
  const targetElement = thisNodes[targetLink].elementData;
  const targetElementClientRect = targetElement.getBoundingClientRect();
  const scrollElement = document.scrollingElement || document.documentElement;
  const currentY = scrollElement.scrollTop;
  const targetY = targetElementClientRect.top;

  if (variables.isAnimated === false) {
    animationScroll(scrollElement, targetY, currentY);
    handlePopupClose();
    variables.localDataObj[variables.status] = false;
    setStatus(variables.status);
    targetElement.classList.add('ui-highLight');
    targetElement.focus();
    setTimeout(() => {
      targetElement.classList.remove('ui-highLight');
    }, 3000);
  }
};

/**
 * popup close
 *
 */
const handlePopupClose = () => {
  const filterPopup = document.getElementById('hn-filter-popup');
  const item = filterPopup.querySelector('.filterList');
  if (filterPopup) {
    filterPopup.remove();
    item.innerHTML = '';
  }
};

/**
 * set FilterList dom Popup
 *
 * @return {object} node dom
 */
const setFilterDom = () => {
  const wrapFilterList = document.createElement('hn-filter-list');
  const closeButton = document.createElement('a');
  const inner = document.createElement('div');
  const filterWrap = document.createElement('div');
  const filterList = document.createElement('div');
  const title = document.createElement('h2');

  wrapFilterList.id = 'hn-filter-popup';
  title.setAttribute('tabindex', 1);
  inner.classList.add('inner');
  filterList.classList.add('filterList');
  filterWrap.classList.add('filterWrap');
  closeButton.classList.add('closeBtn');
  closeButton.innerText = 'Close';
  closeButton.setAttribute('tabindex', 1);
  closeButton.setAttribute('href', '#none');
  closeButton.setAttribute('role', 'button');
  closeButton.addEventListener('click', handlePopupClose);

  filterWrap.appendChild(title);
  filterWrap.appendChild(filterList);
  filterWrap.appendChild(closeButton);
  inner.appendChild(filterWrap);
  wrapFilterList.appendChild(inner);
  return wrapFilterList;
};

/**
 * set FilterList click event
 *
 * @param {string} action
 * @param {object} targetNodes
 */
const setFilterList = (type, nodeArr) => {
  const body = document.body;
  const filterDom = setFilterDom();
  const filterList = filterDom.querySelector('.filterList');
  filterDom.querySelector('h2').innerText = type;

  for (let i = 0; i < nodeArr.length; i = i + 1) {
    const aTag = document.createElement('a');
    aTag.setAttribute('data-position', i);
    aTag.setAttribute('tabindex', 1);
    aTag.setAttribute('href', '#none');
    aTag.innerText = `${nodeArr[i].elementTitle}`;
    aTag.addEventListener('click', function () {
      handleScrollEvent(this, nodeArr);
    });
    filterList.appendChild(aTag);
  }
  body.appendChild(filterDom);
  const filterPopup = document.getElementById('hn-filter-popup');
  const titleFilter = filterPopup.querySelector('h2');
  titleFilter.focus();
};

/**
 * FilterList Popup toggle
 *
 */
const handlePopupToggle = () => {
  const item = document.getElementById('hn-filter-popup');
  if (item) {
    item.remove();
  }
};

/**
 * set FilterList click event
 *
 * @param {Event} clickEvent
 */
const handleFilterEvent = (event) => {
  event.preventDefault();
  let target = event.target;
  if (event.target.tagName !== 'A') {
    target = event.target.parentElement;
  }
  const type = target.dataset.action;
  const nodeArray = variables.filterNodes[type];
  console.log(type, nodeArray);
  handlePopupToggle();
  setFilterList(type, nodeArray);
};

/**
 * initFilterEvent
 *
 */
export const initFilterEvent = () => {
  const filterButton = document
    .getElementById('filter')
    .querySelectorAll('.hnAccbtn');

  filterButton.forEach((el) => {
    const span = document.createElement('span');
    const type = el.dataset.action;
    span.innerText = variables.filterNodes[type].length;
    el.appendChild(span);
    el.addEventListener('click', handleFilterEvent, false);
  });
};
