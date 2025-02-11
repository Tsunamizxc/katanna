import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);
const swiper = new Swiper(".mySwiperPortfolio", {
    spaceBetween: 0,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".mySwiperPortfolio2", {
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
  const swiper3 = new Swiper(".mySwiperPrice", {
    pagination: {
      el: ".swiper-pagination",
    },
    spaceBetween: 50,
  });

//   import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

import AOS from 'aos';
AOS.init();
AOS.init({
  disable: function() {
    var maxWidth = 530;
    return window.innerWidth < maxWidth;
  }
});