import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { gsap } from 'gsap';

import './styles/style.scss';

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

// // // // // // // // // // // // // // // // 


// SLIDER

document.addEventListener('DOMContentLoaded', () => {
  const winnersSwiper = new Swiper('#winners-slider', {
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

  const blogSwiper = new Swiper('#blog-slider', {
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

// // // // // // // // // // // // // // // // 

// TRIAL PROMO IMG

gsap.registerPlugin();

document.addEventListener('DOMContentLoaded', () => {
  const trialContainer = document.querySelector('.promo__img-container');
  let imageIndex = 0;
  let animTimeOut : number | null = null;
  let isAnim = false;

  function addNewImg(x : number, y : number) {
    const newItem = document.createElement('div');
    newItem.className = 'promo__img';
    newItem.style.left = `${x - 75}px`;
    newItem.style.top = `${y - 100}px`;

    const img = document.createElement('img');
    img.src = `./assets/images/trial/img-${imageIndex}.png`
    newItem.appendChild(img)
    imageIndex += imageIndex + 1
    trialContainer?.appendChild(img)
  }

  function changeFirstImg() {
    while (trialContainer.children.length > 5) {
      trialContainer?.removeChild(trialContainer.firstChild)
    }

  }

  function startAnimation() {
    if (isAnim || trialContainer.children.length === 0) return
    isAnim = true

    gsap.to('.promo__img', {
      y: 1000,
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.025,
      onComplete: function() {
        this.targets().forEarch((item : HTMLElement) => {
          if (item.parentNode) {
            item.parentNode.removeChild(item)
          }
        });

        isAnim= false

      }
    })
  }

  trialContainer?.addEventListener('mousemove', function(event) {
    clearTimeout(animTimeOut)
  })

})




// // // // // // // // // // // // // // // // 

// TEXT ANIMATION

// function animateText(element: HTMLElement): void {
//   const text = element.textContent || '';
//   element.textContent = '';

//   text.split('').forEach((char, index) => {
//     const span = document.createElement('span');
//     span.textContent = char === ' ' ? '\u00A0' : char;
//     span.style.display = 'inline-block';
//     span.style.transformOrigin = 'bottom center';
//     element.appendChild(span);

//     gsap.from(span, {
//       duration: 0.5,
//       delay: index * 0.1,
//       rotateX: -90,
//       opacity: 0,
//       x: 0,
//       ease: 'power2.out',
//     });
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const textElement = document.querySelector('.animated-text') as HTMLElement;
//   if (textElement) {
//     animateText(textElement);
//   }
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
