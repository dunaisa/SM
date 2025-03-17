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

import { gsap } from 'gsap';

// Выбираем элемент с текстом
const tgString: HTMLElement | null = document.querySelector('.tg-section__string');

// Проверяем, что элемент существует
if (tgString) {
  // Создаем анимацию
  gsap.to(tgString, {
    x: '-50%', // Перемещаем текст влево на 100% его ширины
    duration: 10, // Длительность анимации
    repeat: -1, // Бесконечное повторение
    ease: 'none', // Линейная анимация без easing
  });
} else {
  console.error('Элемент .tg-section__string не найден');
}

// Выбираем элемент с текстом
// const partnersList: HTMLElement | null = document.querySelector('.partners__list');

// // Проверяем, что элемент существует
// if (partnersList) {
//   // Создаем анимацию
//   gsap.fromTo(
//     partnersList,
//     { x: '-100%' }, // Начальное положение: текст за пределами видимой области справа
//     {
//       x: '100%', // Конечное положение: текст перемещается влево на 100% своей ширины
//       duration: 20, // Длительность анимации
//       repeat: -1, // Бесконечное повторение
//       ease: 'none', // Линейная анимация
//     }
//   );
// } else {
//   console.error('Элемент .partners__list не найден');
// }
  
