import Swiper from "swiper";
import { ibg } from "./functions.js";

const sliders = () => {
  // BuildSlider
  const sliders = document.querySelectorAll('._swiper');

  if (sliders) {
    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];

      if (!slider.classList.contains('swiper-bild')) {
        let slider_items = slider.children;

        if (slider_items) {
          for (let i = 0; i < slider_items.length; i++) {
            const el = slider_items[i];
            el.classList.add('swiper-slide');
          }
        }
        let slider_content = slider.innerHTML;
        let slider_wrapper = document.createElement('div');
        slider_wrapper.classList.add('swiper-wrapper');
        slider_wrapper.innerHTML = slider_content;
        slider.innerHTML = '';
        slider.appendChild(slider_wrapper);
        slider.classList.add('swiper-bild');

        if (slider.classList.contains('_swiper_scroll')) {
          let sliderScroll = document.createElement('div');
          sliderScroll.classList.add('swiper-scrollbar');
          slider.appendChild(sliderScroll);
        }
      }

      if (slider.classList.contains('_gallery')) {
        // slider.data('lightGallery').destroy.true;
      }
    }
    sliders_bild_callback();
  }

  function sliders_bild_callback(params) {}

  const sliderScrollItems = document.querySelectorAll('._swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let i = 0; i < sliderScrollItems.length; i++) {
      const sliderScrollItem = sliderScrollItems[i];
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
  function sliders_bild_callback(params) {}

  let slider_about = new Swiper('.about_slider', {
    /* 
    effect: 'fade,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    */
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    // touchRatio: 0,
    // simulateTouch: false,
    // loop: true,
    // preloadImages: false,
    // lazy: true,
    // Dots
    // pagination: {
    //   el: '.slider-quality__pagging',
    //   clickable: true,
    // },
    // Arrows
    navigation: {
      nextEl: '.about__more .more__item_next',
      prevEl: '.about__more .more__item_prev',
    },
    /*
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,        
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1268: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    */
    on: {
      lazyImageReady: function () {
        ibg();
      },
    },

    // Scrollbar
    // scrollbar: {
    //   el: 'swiper-scrollbar',
    // },
  });
};

export default sliders;
