/**
 * Created by wujincun on 17/6/21.
 */
/*计算html的font-size*/
;(function getHtmlFontSize(){
  doc = window.document, docEl = doc.documentElement;
  let width = docEl.getBoundingClientRect().width;
  let rem = width / 10;
  docEl.style.fontSize = rem + 'px';
})();

