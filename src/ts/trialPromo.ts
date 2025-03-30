export interface ImageConfig {
  src: string;
  width?: string;
  height?: string;
}

export function initTrialPromoAnimation(container: HTMLElement, images: ImageConfig[]) {
  const mouseArea = document.createElement('div');
  mouseArea.className = 'mouse-area';
  container.appendChild(mouseArea);

  const imgElements = images.map((config) => {
    const img = new Image();
    img.src = config.src;
    img.className = 'floating-img';

    img.style.width = `${config.width}%` || '5%';
    img.style.height = `${config.height}%` || '5%';

    img.style.position = 'absolute';
    img.style.transform = 'translate(-50%, -50%)';
    img.style.display = 'none';

    container.appendChild(img);
    return img;
  });

  let activeImages: HTMLImageElement[] = [];
  let nextImageIndex = 0;
  let zIndexCounter = 1;
  let mouseStoppedTimer: number | null = null;
  const MOUSE_STOP_DELAY = 200;

  function isPositionValid(x: number, y: number): boolean {
    if (activeImages.length === 0) return true;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;

    return !activeImages.some((img) => {
      const imgRect = img.getBoundingClientRect();

      const minDistance = containerWidth * 0.05;

      const dx = imgRect.left + imgRect.width / 2 - x;
      const dy = imgRect.top + imgRect.height / 2 - y;
      return Math.sqrt(dx * dx + dy * dy) < minDistance;
    });
  }

  mouseArea.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    if (mouseStoppedTimer) {
      clearTimeout(mouseStoppedTimer);
      mouseStoppedTimer = null;
    }

    if (isPositionValid(x, y)) {
      const img = imgElements[nextImageIndex % imgElements.length];

      img.style.zIndex = `${zIndexCounter++}`;

      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.display = 'block';
      img.style.opacity = '1';

      if (!activeImages.includes(img)) {
        activeImages.push(img);
      }

      nextImageIndex++;
    }

    mouseStoppedTimer = window.setTimeout(() => {
      startFallingAnimation();
    }, MOUSE_STOP_DELAY);
  });

  function startFallingAnimation() {
    if (mouseStoppedTimer) {
      clearTimeout(mouseStoppedTimer);
      mouseStoppedTimer = null;
    }

    const containerHeight = container.getBoundingClientRect().height;

    activeImages.forEach((img, index) => {
      setTimeout(() => {
        img.style.transition = `top ${0.5 + index * 0.1}s ease-in, opacity ${0.5 + index * 0.1}s ease-out`;
        img.style.top = `${parseInt(img.style.top) + containerHeight * 0.5}px`;
        img.style.opacity = '0';

        setTimeout(() => {
          img.style.display = 'none';
          img.style.transition = 'none';
        }, (0.5 + index * 0.1) * 1000);
      }, index * 50);
    });

    setTimeout(() => {
      activeImages = [];
    }, activeImages.length * 50 + 1500);
  }

  mouseArea.addEventListener('mouseleave', () => {
    startFallingAnimation();
  });
}