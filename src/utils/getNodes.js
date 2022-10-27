import setClassToNodes from './setClassToNodes';
export default function getNodes() {
  /**
   * h1~h6 태그 노드, description 반환.
   * @return {object} headingNodes
   */
  const headingNodes = () => {
    const headingNodes = [];
    const heading = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let i = 0; i < heading.length; i++) {
      const innerText = heading[i].innerText.trim();
      if (innerText) {
        headingNodes.push({
          elementTitle: innerText,
          elementData: heading[i],
        });
      }
    }
    return headingNodes;
  };
  /**
   * a 태그 노드, description 반환.
   * @return {object} linkNodes
   */
  const getLinkNodes = () => {
    const linkNodes = [];
    const link = document.querySelectorAll('a');
    for (let i = 0; i < link.length; i++) {
      const innerText = link[i].innerText.trim();
      if (innerText) {
        linkNodes.push({
          elementTitle: innerText,
          elementData: link[i],
        });
      }
    }
    return linkNodes;
  };
  /**
   * form 태그 노드, description 반환.
   * @return {object} FormNodes
   */
  const getFormNodes = () => {
    const FormNodes = [];
    const form = document.querySelectorAll('form');
    for (let i = 0; i < form.length; i++) {
      const title = form[i]?.getAttribute('title');
      const label = form[i]?.getAttribute('aria-label');

      const includeNode = 'INPUT SELECT TEXTAREA'.split(' ');
      const exceptedType = 'submit button hidden image reset'.split(' ');

      let resultText = title || label;
      if (!resultText) {
        let childElement = form[i].elements;
        let fieldNum = 0;
        for (let j = 0; j < childElement.length; j++) {
          let name = includeNode.indexOf(childElement[j].nodeName) !== -1;
          let type = exceptedType.indexOf(childElement[j].type) === -1;
          if (name && type) fieldNum++;
        }
        resultText = 'Form with ' + fieldNum + ' fields';
      }

      FormNodes.push({
        elementTitle: resultText,
        elementData: form[i],
      });
    }
    return FormNodes;
  };
  /**
   * img 태그 노드, description 반환
   * @return {object} imgNodes
   */
  const getImagesNodes = () => {
    const imgNodes = [];
    const images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      let src = images[i]?.getAttribute('src');
      let alt = images[i]?.getAttribute('alt');
      let aria = images[i]?.getAttribute('aria-label');
      let accData = alt || aria;
      if (src && accData) {
        imgNodes.push({
          elementTitle: accData,
          elementData: images[i],
        });
      }
    }
    return imgNodes;
  };
  /**
   * table 태그 노드, description 반환
   * @return {object} tableNodes
   */
  const getTableNodes = () => {
    const tableNodes = [];
    const tables = document.querySelectorAll('table');
    for (let i = 0; i < tables.length; i++) {
      let title = tables[i]?.getAttribute('title');
      let aria = tables[i]?.getAttribute('aria-label');
      let accData = title || aria;
      if (!accData) {
        accData = 'Table with ' + tables[i].rows.length + ' rows';
      }
      tableNodes.push({
        elementTitle: accData,
        elementData: tables[i],
      });
    }
    return tableNodes;
  };

  const applyNodes = {
    headings: headingNodes(),
    links: getLinkNodes(),
    forms: getFormNodes(),
    images: getImagesNodes(),
    tables: getTableNodes(),
  };
  setClassToNodes(applyNodes);

  return applyNodes;
}
