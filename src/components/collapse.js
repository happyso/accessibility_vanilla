import { variables } from '../utils/variables';
/**
 * Apply Status
 *
 * @param {string} action
 */
export const setStatus = (dataAction) => {
  const toolbarCollapse = variables.toolbar.querySelector('.hnCollapse');
  if (variables.localDataObj[dataAction]) {
    variables.toolbar.style.transform = 'translate(0,0)';
    toolbarCollapse.classList.remove('collapsed');
  } else {
    variables.toolbar.style.transform = 'translate(-100%,0)';
    toolbarCollapse.classList.add('collapsed');
  }
};

/**
 * Apply Status
 *
 * @param {Event} clickEvent
 */
export const handleStatusEvent = (event) => {
  if (event.currentTarget.dataset.action) {
    const dataAction = event.currentTarget.dataset.action;
    variables.localDataObj[dataAction] = !variables.localDataObj[dataAction];
    setStatus(dataAction);
  }
};

/**
 * initStatusEvent
 *
 */
export const initStatusEvent = () => {
  const toolbarCollapse = variables.toolbar.querySelector('.hnCollapse');
  toolbarCollapse.addEventListener('click', handleStatusEvent, false);
};
