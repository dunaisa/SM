export function initScreenAnimator(): void {
  const sections: NodeListOf<HTMLElement> = document.querySelectorAll(".full-screen-anim");

  sections.forEach((section: HTMLElement) => {
    const gridContainer: HTMLDivElement = document.createElement("div");
    gridContainer.classList.add("grid-container");

    for (let i = 0; i < 84; i++) {
      const gridItem: HTMLDivElement = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);
    }

    section.appendChild(gridContainer);

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const gridItems: HTMLElement[] = Array.from(entry.target.querySelectorAll(".grid-item"));
            const shuffledItems = shuffleArray(gridItems);
            let completedAnimations = 0;

            shuffledItems.forEach((item: HTMLElement, index: number) => {
              setTimeout(() => {
                item.style.transition = "opacity 0.3s ease";
                item.style.opacity = "0";
                
                const onTransitionEnd = () => {
                  completedAnimations++;
                  item.removeEventListener('transitionend', onTransitionEnd);
                  
                  if (completedAnimations === gridItems.length) {
                    section.style.display = "none";
                    
                    setTimeout(() => {
                      gridContainer.remove();
                    }, 300);
                  }
                };
                
                item.addEventListener('transitionend', onTransitionEnd);
              }, index * 10);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
  });
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}