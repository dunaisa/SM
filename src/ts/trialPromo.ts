import gsap from 'gsap';

export function initTrialPromoAnimation(): void {
  const trialContainer = document.querySelector<HTMLElement>('.promo__img-container');
  if (!trialContainer) return;

  let imageIndex = 0;
  let animTimeout: number | null = null;
  let isAnimating = false;

  function addNewImg(x: number, y: number): void {
    const newItem = document.createElement('div');
    newItem.className = 'promo__img';
    newItem.style.left = `${x - 75}px`;
    newItem.style.top = `${y - 100}px`;

    const img = document.createElement('img');
    img.src = `./assets/images/trial/img-${imageIndex}.png`;
    newItem.appendChild(img);

    trialContainer.appendChild(newItem);
    imageIndex++;
  }

  function startAnimation(): void {
    if (isAnimating || !trialContainer.children.length) return;
    isAnimating = true;

    gsap.to('.promo__img', {
      y: 1000,
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.025,
      onComplete: () => {
        Array.from(trialContainer.children).forEach((item) => item.remove());
        isAnimating = false;
      },
    });
  }

  trialContainer.addEventListener('mousemove', (event: MouseEvent) => {
    clearTimeout(animTimeout!);
  });
}