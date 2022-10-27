import '../styles/_default.scss';
// import throttle from 'lodash/throttle';

import template from '../templates/template.pug';
import {
  getLocalData,
  setLocalData,
  showConsoleLocalData,
} from '../utils/getLocalStorage';
import getFilterNodes from '../utils/getNodes';
import { variables } from '../utils/variables';

import { initStatusEvent, setStatus } from './collapse';
import { initColorEvent, setColorMode } from './colorMode';
import { initFilterEvent } from './filter';
import { initFontEvent, setFont } from './font';
import { setReadableStyle, initReadableEvent } from './readable';
import { initScreenEvent, setScreen } from './screen';
import { initTextModeEvent, setPlainText } from './textMode';
import { initTooltipEvent, setTooltip } from './tooltip';

/* todo list  */
/*
reset v
- 설정한 localdata가 json으로 다운로드 가능하도록 작업 필요(참조:https://web.dev/read-files/) v
  //번역이슈.
*/

class HN_accessibility {
  constructor() {
    variables.filterNodes = getFilterNodes();
    variables.localDataObj = getLocalData();

    if (document.body.getAttribute('id') !== 'popup') this.init();
  }

  /**
   * localStorage 값 dom 뿌려줌
   *
   */
  setToolsActive() {
    if (variables.localDataObj[variables.cfontSize] !== 0) {
      setReadableStyle('font-size', '%');
    }
    if (variables.localDataObj[variables.cLetterSpace] !== 0) {
      setReadableStyle('letter-spacing', 'px');
    }
    if (variables.localDataObj[variables.cLineHeight] !== 0) {
      setReadableStyle('line-height', '%');
    }
    if (variables.localDataObj[variables.cWordSpace] !== 0) {
      setReadableStyle('word-spacing', 'px');
    }
    if (variables.localDataObj[variables.font] !== null) {
      setFont(variables.localDataObj[variables.font]);
    }

    setColorMode('invert');
    setPlainText('text-mode');
    setTooltip(variables.tooltipMouseover);
    setTooltip(variables.tooltipPermanent);
    setScreen(variables.mask);
    setScreen(variables.ruler);
  }

  /**
   * reset event
   *
   */
  reset() {
    const handleResetClick = () => {
      variables.localDataObj = {
        status: true,
        'current-font-size': null,
        'current-letter-spacing': null,
        'current-line-height': null,
        'current-word-spacing': null,
        'font-famliy': 'default',
        invert: false,
        mask: false,
        ruler: false,
        'text-mode': false,
        'tooltip-mouseover': false,
        'tooltip-permanent': false,
      };
      this.setToolsActive();
    };
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', handleResetClick, false);
  }

  /**
   * json data Download
   *
   */
  myDataDownload() {
    const handleDownloadClick = () => {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(variables.localDataObj));
      const dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute('href', dataStr);
      dlAnchorElem.setAttribute('download', 'Accessibility_My_Data.json');
      dlAnchorElem.click();
    };
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', handleDownloadClick, false);
  }

  /**
   * checkDataValidation
   *
   * @param {object} localStorage_object
   */
  checkDataValidation(data) {
    const defaultLocalDataObj = variables.defaultLocalDataObj;
    for (let prop in defaultLocalDataObj) {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        defaultLocalDataObj[prop] = data[prop];
        console.log(prop + ' :' + data[prop]);
      } else {
        console.log(prop + ' : 올바르지 않은 데이터 입니다.');
      }
    }
    variables.localDataObj = defaultLocalDataObj;
    this.setToolsActive();
  }
  /**
   * json data Upload
   *
   */
  UploadMyData() {
    const loadButton = document.getElementById('loadButton');
    const fileSelector = document.getElementById('fileSelector');
    const _this = this;

    loadButton.addEventListener(
      'click',
      () => {
        fileSelector.click();
      },
      false
    );

    fileSelector.addEventListener('change', (event) => {
      const fileList = event.target.files;
      console.log(fileList);
      readImage(fileList[0]);
    });

    function readImage(file) {
      // Check if the file is an json.
      if (file.type && file.type.indexOf('application/json') === -1) {
        console.log('File is not an json.', file.type, file);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const JsonObj = JSON.parse(e.target.result);
        _this.checkDataValidation(JsonObj);
      };
      reader.readAsText(file);
    }
  }

  /**
   * initKeyEvent
   *
   */
  initKeyEvent = () => {
    let currentFocus = -1;
    const h5Title = variables.toolbar.querySelectorAll('.sectionTitle');
    const titleLength = h5Title.length;

    const setShortcuts = (event) => {
      if (event.keyCode == 40 && event.altKey) { //Arrow Down + alt
        variables.localDataObj[variables.status] = false;
        setStatus(variables.status);
      }
      if (event.keyCode == 38 && event.altKey) { //Arrow Up + alt
        variables.localDataObj[variables.status] = true;
        setStatus(variables.status);
      }
      if (event.keyCode == 82 && event.shiftKey) { // r + shift
        setLocalData(variables.defaultLocalDataObj);
        variables.localDataObj = getLocalData();
        this.setToolsActive();
      }

      if (event.keyCode == 39 && event.shiftKey) { //Arrow Right
        currentFocus = currentFocus + 1 < titleLength ? currentFocus + 1 : 0;
        console.log(currentFocus);
        h5Title[currentFocus].focus();
      }
      if (event.keyCode == 37 && event.shiftKey) { //Arrow Left
        currentFocus =
          0 <= currentFocus - 1 ? currentFocus - 1 : titleLength - 1;
        console.log(currentFocus);
        h5Title[currentFocus].focus();
      }
    };
    document.addEventListener('keydown', setShortcuts);
  };

  /**
   * textNode를 반환함
   *
   * @param {node} document.body
   * @return [Textnodes] textNode Array를 반환함
   */
  getTextNodes(root) {
    let node;
    const textNodes = [];
    const textTree = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    while ((node = textTree.nextNode())) {
      textNodes.push(node);
    }
    return textNodes;
  }

  /**
   * 텍스트 노드를 감싸는 커스텀 태그 생성
   *
   * @param {nodes}
   */
  setTextNodes(nodes) {
    const excludeEl = 'SCRIPT STYLE SELECT OPTION IMG FRAMESET FRAME IFRAME NOSCRIPT BR BUTTON INPUT PATH'.split(
      ' '
    );
    for (let i = 0; i < nodes.length; i = i + 1) {
      const exclude = excludeEl.indexOf(nodes[i].parentNode.nodeName);
      if (nodes[i].nodeValue.trim() && exclude) {
        const item = nodes[i];
        const parent = nodes[i].parentNode;
        const name = document.createElement('hn-acc');
        const clone = nodes[i].cloneNode(true);
        name.className = 'hn-style';
        parent.replaceChild(name, item);
        name.appendChild(clone);
        parent.appendChild(name);
      }
    }
  }

  /**
   * 툴바 dom append
   *
   */
  applyToolBar() {
    const toolbar = document.createElement('div');
    toolbar.id = 'hnAccessibilityToolBar';
    toolbar.innerHTML = template();
    document.body.appendChild(toolbar);
    variables.toolbar = toolbar;
  }

  /**
   * this.styleSheets에 툴바style tag를 제외한 styleSheets Array 생성
   *
   */
  getStyleSheet() {
    const defaultStyles = document.styleSheets;
    for (let i = 0; i < defaultStyles.length; i++) {
      const prop = defaultStyles[i].ownerNode.id;
      if (prop.indexOf('hn-acc') <= -1) {
        variables.styleSheets.push(defaultStyles[i]);
      }
    }
  }

  initClickEvent() {
    initReadableEvent();
    initTextModeEvent();
    initFontEvent();
    initColorEvent();
    initTooltipEvent();
    initScreenEvent();
  }

  init() {
    showConsoleLocalData(this.getLocalData); //최종 배포시 삭제필요
    this.setTextNodes(this.getTextNodes(document.body));
    this.getStyleSheet();
    this.applyToolBar();

    initStatusEvent();
    initFilterEvent();
    this.reset();
    this.myDataDownload();
    this.initClickEvent();

    this.setToolsActive();
    setStatus(variables.status);

    this.initKeyEvent();
    this.UploadMyData();

    //beforeunload
    window.addEventListener('beforeunload', () => {
      setLocalData(variables.localDataObj);
    });
  }
}

export default HN_accessibility;
