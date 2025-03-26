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

window.addEventListener('scroll', (): void => {
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

// SLIDER
document.addEventListener('DOMContentLoaded', (): void => {
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

// TRIAL PROMO IMG
gsap.registerPlugin();
document.addEventListener('DOMContentLoaded', (): void => {
  const trialContainer: HTMLElement | null = document.querySelector('.promo__img-container');
  let imageIndex = 0;
  let animTimeOut: number | null = null;
  let isAnim = false;

  function addNewImg(x: number, y: number): void {
    const newItem: HTMLElement = document.createElement('div');
    newItem.className = 'promo__img';
    newItem.style.left = `${x - 75}px`;
    newItem.style.top = `${y - 100}px`;

    const img = document.createElement('img');
    img.src = `./assets/images/trial/img-${imageIndex}.png`;
    newItem.appendChild(img);

    imageIndex += 1;
    trialContainer?.appendChild(newItem);
  }

  function changeFirstImg(): void {
    while (trialContainer?.children.length && trialContainer.children.length > 5) {
      trialContainer.removeChild(trialContainer.firstChild as Node);
    }
  }

  function startAnimation(): void {
    if (isAnim || !trialContainer?.children.length) return;
    isAnim = true;

    gsap.to('.promo__img', {
      y: 1000,
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.025,
      onComplete: (): void => {
        Array.from(trialContainer.children).forEach((item: Element): void => {
          item.parentNode?.removeChild(item);
        });
        isAnim = false;
      },
    });
  }

  trialContainer?.addEventListener('mousemove', (event: MouseEvent): void => {
    clearTimeout(animTimeOut!);
  });
});

// TEXT ANIMATION
const animatedTexts: NodeListOf<HTMLElement> = document.querySelectorAll('.anim-text');

function shuffleString(str: string): string {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

async function animatePart(textPart: string, element: HTMLElement, speed: number): Promise<void> {
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

async function animateText(element: HTMLElement, speed = 100): Promise<void> {
  const string = element.textContent?.trim() || '';
  const len = string.length;
  const partLength = Math.ceil(len / 3);
  const parts = [
    string.substring(0, partLength),
    string.substring(partLength, partLength * 2),
    string.substring(partLength * 2),
  ];

  element.textContent = '';

  for (const part of parts) {
    const partElement = document.createElement('span');
    element.appendChild(partElement);
    await animatePart(part, partElement, speed);
  }
}

function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function handleScroll(): void {
  animatedTexts.forEach((text: HTMLElement): void => {
    if (text.dataset.animated !== 'true' && isElementInViewport(text)) {
      text.dataset.animated = 'true';
      animateText(text, 80);
    }
  });
}

function initTextAnimations(): void {
  animatedTexts.forEach((text: HTMLElement): void => {
    if (isElementInViewport(text)) {
      text.dataset.animated = 'true';
      animateText(text, 100);
    }
  });

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
}

window.addEventListener('DOMContentLoaded', initTextAnimations);

// IMAGES pixels ANIMATION
import awardsImage from './assets/images/anim-img/sm-awards-img.png';
import bannerImage from './assets/images/anim-img/banner-img.png';
import voteImage from './assets/images/anim-img/vote-img.png';
import retrogradeImage from './assets/images/anim-img/retrograde-img.png';
import agencyImage from './assets/images/anim-img/agency-img.png';
import youngImage from './assets/images/anim-img/young-img.png';
import regionsImage from './assets/images/anim-img/regions-img.png';
import confImage from './assets/images/anim-img/conf-img.png';
import aboutImage from './assets/images/anim-img/about-img.jpg';

class PixelImageAnimator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private dpr: number;
  private options: {
    initialPixelSize: number;
    finalPixelSize: number;
    animationDuration: number;
  };
  private animationId: number | null;
  private startTime: number | null;
  private hasAnimated: boolean;
  private imageData: ImageData;

  constructor(canvasElement: HTMLCanvasElement, imageSrc: string, options: Partial<{ initialPixelSize: number; finalPixelSize: number; animationDuration: number }> = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.img = new Image();
    this.img.src = imageSrc;
    this.dpr = window.devicePixelRatio || 1;
    this.options = {
      initialPixelSize: 200,
      finalPixelSize: 10,
      animationDuration: 2000,
      ...options,
    };
    this.animationId = null;
    this.startTime = null;
    this.hasAnimated = false;
    this.imageData = new ImageData(1, 1);
  }

  setupCanvas(): void {
    const canvasContainer = this.canvas.parentElement!.getBoundingClientRect();
    this.canvas.width = canvasContainer.width * this.dpr;
    this.canvas.height = canvasContainer.height * this.dpr;
    this.canvas.style.width = `${canvasContainer.width}px`;
    this.canvas.style.height = `${canvasContainer.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  progressiveLoad(progress: number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const currentPixelSize = Math.max(
      this.options.finalPixelSize,
      this.options.initialPixelSize - (this.options.initialPixelSize - this.options.finalPixelSize) * (progress / 100)
    );

    const scaledWidth = this.canvas.width / this.dpr;
    const scaledHeight = this.canvas.height / this.dpr;
    const cols = Math.ceil(scaledWidth / currentPixelSize);
    const rows = Math.ceil(scaledHeight / currentPixelSize);
    const halfPixel = currentPixelSize / 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (progress < 100 && Math.random() * 100 > progress) continue;

        const pixelX = x * currentPixelSize;
        const pixelY = y * currentPixelSize;

        const sampleX = Math.min(
          Math.floor((pixelX + halfPixel) * this.dpr),
          this.imageData.width - 1
        );
        const sampleY = Math.min(
          Math.floor((pixelY + halfPixel) * this.dpr),
          this.imageData.height - 1
        );

        const dataIndex = (sampleY * this.imageData.width + sampleX) * 4;

        this.ctx.fillStyle = `rgba(
          ${this.imageData.data[dataIndex]},
          ${this.imageData.data[dataIndex + 1]},
          ${this.imageData.data[dataIndex + 2]},
          ${this.imageData.data[dataIndex + 3] / 255}
        )`;

        this.ctx.fillRect(pixelX, pixelY, currentPixelSize, currentPixelSize);
      }
    }
  }

  animate(currentTime: number): void {
    if (!this.startTime) this.startTime = currentTime;

    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.options.animationDuration * 100, 100);

    this.progressiveLoad(progress);

    if (progress < 100) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    } else {
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.drawImage(this.img, 0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
      this.hasAnimated = true;
    }
  }

  init(): void {
    this.img.onload = (): void => {
      this.setupCanvas();

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;

      tempCtx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
      this.imageData = tempCtx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };

    this.img.onerror = (): void => {
      console.error(`Failed to load image: ${this.img.src}`);
    };
  }

  startAnimation(): void {
    if (!this.hasAnimated && !this.animationId) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

document.addEventListener('DOMContentLoaded', (): void => {
  const imageAnimators: PixelImageAnimator[] = [];
  const availableImages = [awardsImage, voteImage, retrogradeImage, bannerImage, agencyImage, youngImage, regionsImage, confImage, aboutImage];

  function isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= ((window.innerHeight || document.documentElement.clientHeight) / 2) &&
      rect.bottom >= 0
    );
  }

  function handleScroll(): void {
    imageAnimators.forEach((animator: PixelImageAnimator): void => {
      if (isElementInViewport(animator.canvas)) {
        animator.startAnimation();
      }
    });
  }

  document.querySelectorAll<HTMLCanvasElement>('.pixel-animation').forEach((canvas, index): void => {
    const imageType = canvas.dataset.imageType;
    let imageSrc: string;

    switch (imageType) {
      case 'awards': imageSrc = awardsImage; break;
      case 'banner': imageSrc = bannerImage; break;
      case 'vote': imageSrc = voteImage; break;
      case 'retrograde': imageSrc = retrogradeImage; break;
      case 'agency': imageSrc = agencyImage; break;
      case 'young': imageSrc = youngImage; break;
      case 'regions': imageSrc = regionsImage; break;
      case 'conf': imageSrc = confImage; break;
      case 'about': imageSrc = aboutImage; break;
      default: imageSrc = availableImages[index % availableImages.length];
    }

    const customOptions = {
      initialPixelSize: canvas.dataset.initialSize ? parseInt(canvas.dataset.initialSize) : undefined,
      finalPixelSize: canvas.dataset.finalSize ? parseInt(canvas.dataset.finalSize) : undefined,
      animationDuration: canvas.dataset.duration ? parseInt(canvas.dataset.duration) : undefined,
    };

    const filteredOptions = Object.fromEntries(
      Object.entries(customOptions).filter(([_, v]) => v !== undefined)
    );

    const animator = new PixelImageAnimator(canvas, imageSrc, filteredOptions);
    animator.init();
    imageAnimators.push(animator);
  });

  window.addEventListener('scroll', handleScroll);

  handleScroll();

  window.addEventListener('beforeunload', (): void => {
    window.removeEventListener('scroll', handleScroll);
    imageAnimators.forEach((animator: PixelImageAnimator): void => animator.destroy());
  });
});


// // // // // // // // // // // // // // // 

// promo text animation

class PixelTextAnimator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private text: string;
  private fontSize: number;
  private fontFamily: string;
  private dpr: number;
  private options: {
    initialPixelSize: number;
    finalPixelSize: number;
    animationDuration: number;
  };
  private animationId: number | null;
  private startTime: number | null;

  constructor(canvasElement: HTMLCanvasElement, text: string, fontSize: number, fontFamily: string, options: Partial<{ initialPixelSize: number; finalPixelSize: number; animationDuration: number }> = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.dpr = window.devicePixelRatio || 1;
    this.options = {
      initialPixelSize: 20,
      finalPixelSize: 1,
      animationDuration: 2000,
      ...options,
    };
    this.animationId = null;
    this.startTime = null;
  }

  setupCanvas(): void {
    const canvasContainer = this.canvas.parentElement!.getBoundingClientRect();
    this.canvas.width = canvasContainer.width * this.dpr;
    this.canvas.height = canvasContainer.height * this.dpr;
    this.canvas.style.width = `${canvasContainer.width}px`;
    this.canvas.style.height = `${canvasContainer.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }

  progressiveLoad(progress: number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const currentPixelSize = Math.max(
      this.options.finalPixelSize,
      this.options.initialPixelSize - (this.options.initialPixelSize - this.options.finalPixelSize) * (progress / 100)
    );

    const textWidth = this.ctx.measureText(this.text).width;
    const x = this.canvas.width / (2 * this.dpr);
    const y = this.canvas.height / (2 * this.dpr);

    const cols = Math.ceil(textWidth / currentPixelSize);
    const rows = Math.ceil(this.fontSize / currentPixelSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (progress < 100 && Math.random() * 100 > progress) continue;

        const pixelX = col * currentPixelSize;
        const pixelY = row * currentPixelSize;

        this.ctx.fillStyle = 'black'; // Цвет текста
        this.ctx.fillRect(pixelX, pixelY, currentPixelSize, currentPixelSize);
      }
    }
  }

  animate(currentTime: number): void {
    if (!this.startTime) this.startTime = currentTime;

    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.options.animationDuration * 100, 100);

    this.progressiveLoad(progress);

    if (progress < 100) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillText(this.text, this.canvas.width / (2 * this.dpr), this.canvas.height / (2 * this.dpr));
    }
  }

  startAnimation(): void {
    if (!this.animationId) {
      this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.querySelector('.promo__title');
  if (titleElement) {
    const text = titleElement.textContent?.trim() || '';
    const fontSize = 48; // Размер шрифта
    const fontFamily = 'Arial, sans-serif'; // Шрифт

    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'promo__title-canvas';
    titleElement.replaceWith(canvas);

    // Инициализируем аниматор
    const textAnimator = new PixelTextAnimator(canvas, text, fontSize, fontFamily, {
      initialPixelSize: 20,
      finalPixelSize: 1,
      animationDuration: 3000,
    });

    textAnimator.setupCanvas();
    textAnimator.startAnimation();
  }
});