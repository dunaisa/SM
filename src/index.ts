import { initHeaderAnimation } from './ts/header';
import { initSliders } from './ts/slider';
import { initTrialPromoAnimation } from './ts/trialPromo';
import { initTextAnimations } from './ts/textAnimation';
import { PixelImageAnimator } from './ts/pixelImageAnimator';
import './styles/style.scss';

import awardsImage from './assets/images/anim-img/sm-awards-img.png';
import bannerImage from './assets/images/anim-img/banner-img.png';
import voteImage from './assets/images/anim-img/vote-img.png';
import retrogradeImage from './assets/images/anim-img/retrograde-img.png';
import agencyImage from './assets/images/anim-img/agency-img.png';
import youngImage from './assets/images/anim-img/young-img.png';
import regionsImage from './assets/images/anim-img/regions-img.png';
import confImage from './assets/images/anim-img/conf-img.png';
import aboutImage from './assets/images/anim-img/about-img.jpg';

const imageMap = {
  awards: awardsImage,
  banner: bannerImage,
  vote: voteImage,
  retrograde: retrogradeImage,
  agency: agencyImage,
  young: youngImage,
  regions: regionsImage,
  conf: confImage,
  about: aboutImage,
};


document.addEventListener('DOMContentLoaded', () => {
  initHeaderAnimation();
  initSliders();
  initTrialPromoAnimation();
  initTextAnimations();

  const canvases = document.querySelectorAll<HTMLCanvasElement>('.pixel-animation');
  document.querySelectorAll('.pixel-animation').forEach((canvas) => {
    const imageType = canvas.dataset.imageType;
    const imageSrc = imageType ? imageMap[imageType] : null;
  
    if (imageSrc) {
      const animator = new PixelImageAnimator(canvas, imageSrc);
      animator.init();
    }
  });
});