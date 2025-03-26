export function initHeaderAnimation(): void {
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return;

  let lastScrollTop = 0;
  const SCROLL_THRESHOLD = 20;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop === 0) {
      header.classList.remove('hidden');
    } else if (scrollTop > lastScrollTop) {
      header.classList.add('hidden');
    } else if (lastScrollTop - scrollTop > SCROLL_THRESHOLD) {
      header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
  });
}