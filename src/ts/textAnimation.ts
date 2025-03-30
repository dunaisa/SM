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
    await new Promise((resolve) => setTimeout(resolve, speed));
  }

  for (let i = 0; i < textPart.length; i++) {
    const corrected = textPart.substring(0, i + 1);
    const remainingShuffled = shuffled.substring(i + 1);
    element.textContent = corrected + remainingShuffled;
    await new Promise((resolve) => setTimeout(resolve, speed * 0.7));
  }
}

async function animateText(element: HTMLElement, speed = 100): Promise<void> {
  const string = element.textContent?.trim() || '';
  const parts = [
    string.substring(0, Math.ceil(string.length / 3)),
    string.substring(Math.ceil(string.length / 3), Math.ceil((string.length * 2) / 3)),
    string.substring(Math.ceil((string.length * 2) / 3)),
  ];

  element.textContent = '';

  for (const part of parts) {
    const partElement = document.createElement('span');
    element.appendChild(partElement);
    await animatePart(part, partElement, speed);
  }
}

export function initTextAnimations(): void {
  const animatedTexts = document.querySelectorAll<HTMLElement>('.anim-text');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target as HTMLElement;
        if (!text.dataset.animated) {
          text.dataset.animated = 'true';
          animateText(text, 80);
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px 0px 0px'
  });

  animatedTexts.forEach(text => observer.observe(text));
}