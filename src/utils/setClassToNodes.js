/**
 * getNodes에서 받은 노드에 커스텀 클래스 삽입
 */
const addClassToNodes = (nodes, nodeClass) => {
  if (nodes) {
    nodes.forEach((element) => {
      element.elementData.classList.add(nodeClass);
    });
  }
};

export default function addClass(filterNodes) {
  addClassToNodes(filterNodes.headings, 'hn-acc-heading');
  addClassToNodes(filterNodes.links, 'hn-acc-link');
  addClassToNodes(filterNodes.forms, 'hn-acc-form');
  addClassToNodes(filterNodes.images, 'hn-acc-image');
  addClassToNodes(filterNodes.tables, 'hn-acc-table');
}
