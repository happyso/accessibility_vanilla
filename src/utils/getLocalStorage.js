import { variables } from './variables';
const defaults = { ...variables };

/**
 *  localStorage HnAccDatapoints을 가져옵니다
 * @return localDataObj Object
 */
export const getLocalData = () => {
  const localData = localStorage.getItem(defaults.HnAccDatapoints);
  let localDataObj = variables.defaultLocalDataObj;
  if (localData !== null && localData !== undefined) {
    localDataObj = JSON.parse(localData);
    setLocalData(localDataObj);
  }
  return localDataObj;
};
/**
 * set localStorage
 * @param {object} localDataObj
 */
export const setLocalData = (localDataObj) => {
  localStorage.setItem(defaults.HnAccDatapoints, JSON.stringify(localDataObj));
};
/**
 * 셋팅된 로컬데이터를 콘솔창에 보여줍니다.
 * @param {object} localDataObj
 */
export const showConsoleLocalData = (localDataObj) => {
  for (const property in localDataObj) {
    console.log(`${property}: ${localDataObj[property]}`);
  }
};
