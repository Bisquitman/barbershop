// import burger from './modules/burger.js';
// import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import * as flsFunctions from './modules/functions.js';
import service from './modules/service.js';
import slider from './modules/slider.js';
// import spoilers from './modules/spoilers.js';

const init = () => {
  flsFunctions.isWebp();
  slider();
  service();
};

window.addEventListener('DOMContentLoaded', init);

// spoilers();
// burger();
// flsFunctions.ibg();
// useDynamicAdapt();

// window.onload = function () {
//   document.addEventListener('click', flsFunctions.documentActions);
// };
