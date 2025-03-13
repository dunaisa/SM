import './styles/style.scss';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.winners__cards-container', {
    modules: [Navigation],
    direction: 'horizontal',
    loop: false,
    slidesPerView: 3.5,
    slidesPerGroup: 1,
    spaceBetween: 12,
    navigation: {
      nextEl: '.cards__btn_next',
      prevEl: '.cards__btn_prev',
    },
  });

  
});

  
