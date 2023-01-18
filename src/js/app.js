import burger from './modules/burger.js';
import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import * as flsFunctions from './modules/functions.js';
import sliders from './modules/sliders.js';
import spoilers from './modules/spoilers.js';
import Swiper, { Navigation, Pagination } from 'swiper';


flsFunctions.isWebp();
const swiper = new Swiper();

spoilers();
burger();
flsFunctions.ibg();
sliders();
useDynamicAdapt();

window.onload = function () {
  document.addEventListener('click', flsFunctions.documentActions);
};