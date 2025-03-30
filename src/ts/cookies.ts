
export function initCookies(): void {
  const cookies = document.querySelector('.cookies') as HTMLElement | null;
  const acceptButton = document.querySelector('.cookies__btn-accept') as HTMLButtonElement | null;
  const closeButton = document.querySelector('.cookies__btn-close') as HTMLElement | null;

  if (cookies) {
    setTimeout(() => {
      cookies.classList.remove("hidden");
    }, 1000);

    if (acceptButton) {
      acceptButton.addEventListener("click", () => {
        hideBanner(cookies);
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        hideBanner(cookies);
      });
    }
  }
}

function hideBanner(banner: HTMLElement): void {
  banner.classList.add("hidden");
}