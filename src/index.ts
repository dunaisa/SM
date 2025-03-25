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
  const trialContainer: HTMLElement | null = document.querySelector('.promo__img-container');
  let imageIndex = 0;
  let animTimeOut: number | null = null;
  let isAnim = false;

  function addNewImg(x : number, y : number) {
    const newItem: HTMLElement | null = document.createElement('div');
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
        this.targets().forEarch((item : HTMLElement | null) => {
          if (item?.parentNode) {
            item?.parentNode.removeChild(item)
          }
        });

        isAnim= false

      }
    })
  }

  trialContainer.addEventListener('mousemove', function(event) {
    clearTimeout(animTimeOut)
  })
})






// // // // // // // // // // // // // // // // 

// TEXT ANIMATION

const animatedTexts = document.querySelectorAll('.anim-text');

function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

async function animatePart(textPart, element, speed) {
  const shuffled = shuffleString(textPart);
  element.textContent = '';
  
  for (let i = 0; i < textPart.length; i++) {
    element.textContent = shuffled.substring(0, i + 1);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  
  for (let i = 0; i < textPart.length; i++) {
    const corrected = textPart.substring(0, i + 1);
    const remainingShuffled = shuffled.substring(i + 1);
    element.textContent = corrected + remainingShuffled;
    await new Promise(resolve => setTimeout(resolve, speed * 0.7));
  }
}

async function animateText(element, speed = 100) {
  const string = element.textContent.trim();
  const len = string.length;
  const partLength = Math.ceil(len / 3);
  
  const parts = [
    string.substring(0, partLength),
    string.substring(partLength, partLength * 2),
    string.substring(partLength * 2)
  ];
  
  element.textContent = '';
  
  for (const part of parts) {
    const partElement = document.createElement('span');
    element.appendChild(partElement);
    await animatePart(part, partElement, speed);
  }
}

// Функция для проверки видимости элемента
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Обработчик скролла с троттлингом
function handleScroll() {
  animatedTexts.forEach(text => {
    if (text.dataset.animated !== 'true' && isElementInViewport(text)) {
      text.dataset.animated = 'true';
      animateText(text, 80);
    }
  });
}

// Инициализация
function initTextAnimations() {
  // Помечаем элементы, которые уже в зоне видимости при загрузке
  animatedTexts.forEach(text => {
    if (isElementInViewport(text)) {
      text.dataset.animated = 'true';
      animateText(text, 80);
    }
  });
  
  // Добавляем обработчик скролла
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
}

// Запускаем при полной загрузке страницы
window.addEventListener('DOMContentLoaded', initTextAnimations);












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
