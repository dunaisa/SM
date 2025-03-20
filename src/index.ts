import './styles/style.scss';

// import Swiper from 'swiper';
// import { Navigation } from 'swiper/modules';

// document.addEventListener('DOMContentLoaded', () => {
//   const winnersSwiper = new Swiper('#winners-slider', {
//     modules: [Navigation],
//     direction: 'horizontal',
//     loop: false,
//     slidesPerView: 3.5,
//     slidesPerGroup: 1,
//     spaceBetween: 12,
//     navigation: {
//       nextEl: '.cards__btn_next',
//       prevEl: '.cards__btn_prev',
//     },
//   });

//   const blogSwiper = new Swiper('#blog-slider', {
//     modules: [Navigation],
//     direction: 'horizontal',
//     loop: false,
//     slidesPerView: 3.5,
//     slidesPerGroup: 1,
//     spaceBetween: 12,
//     navigation: {
//       nextEl: '.cards__btn_next',
//       prevEl: '.cards__btn_prev',
//     },
//   });

  
// });

// const pixels = document.querySelectorAll('.pixel');

// pixels.forEach((pixel) => {
//     const randomDelay = Math.random() * 0.9; // Случайная задержка от 0 до 2 секунд
//     pixel.style.animationDelay = `${randomDelay}s`;
// });

// // Функция для запуска анимации пикселей
// function startPixelAnimation() {
//   const pixels = document.querySelectorAll('.pixel');
//   pixels.forEach((pixel) => {
//       const randomDelay = Math.random() * 2; // Случайная задержка от 0 до 2 секунд
//       pixel.style.animationDelay = `${randomDelay}s`;
//       pixel.style.opacity = 1; // Запуск анимации
//   });
// }

// // Создаем IntersectionObserver
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//           // Если блок в области видимости, запускаем анимацию
//           startPixelAnimation();
//           // Отключаем observer после первого срабатывания
//           observer.unobserve(entry.target);
//       }
//   });
// });

// // Находим блок и начинаем наблюдать за ним
// const pixelContainer = document.getElementById('pixel-container');
// observer.observe(pixelContainer);


// АНИМАЦИЯ ХЭДЕРА

let lastScrollTop = 0;
    const header: HTMLElement | null = document.querySelector('.header');
    const SCROLL_THRESHOLD = 20;

    window.addEventListener('scroll', function(): void {
      const scrollTop: number = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        header?.classList.remove('hidden');
      } else if (scrollTop > lastScrollTop) {
        header?.classList.add('hidden');
      } else if (lastScrollTop - scrollTop > SCROLL_THRESHOLD) {
        header?.classList.remove('hidden');
      }   

      lastScrollTop = scrollTop;
    });
    
  
