import './styles/style.scss';
import { initHeaderAnimation } from './ts/header';
import { initSliders } from './ts/slider';
import { initTrialPromoAnimation } from './ts/trialPromo';
import { initTextAnimations } from './ts/textAnimation';
import { PixelImageAnimator } from './ts/pixelImageAnimator';

const awardsImage = require('./assets/images/anim-img/sm-awards-img.png') as string;
const bannerImage = require('./assets/images/anim-img/banner-img.png') as string;
const voteImage = require('./assets/images/anim-img/vote-img.png') as string;
const retrogradeImage = require('./assets/images/anim-img/retrograde-img.png') as string;
const agencyImage = require('./assets/images/anim-img/agency-img.png') as string;
const youngImage = require('./assets/images/anim-img/young-img.png') as string;
const regionsImage = require('./assets/images/anim-img/regions-img.png') as string;
const confImage = require('./assets/images/anim-img/conf-img.png') as string;
const aboutImage = require('./assets/images/anim-img/about-img.jpg') as string;

type ImageMap = {
  awards: string;
  banner: string;
  vote: string;
  retrograde: string;
  agency: string;
  young: string;
  regions: string;
  conf: string;
  about: string;
};

const imageMap: ImageMap = {
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
  canvases.forEach((canvas) => {
    const imageType = canvas.dataset.imageType as keyof ImageMap;
    const imageSrc = imageType ? imageMap[imageType] : null;

    if (imageSrc) {
      const animator = new PixelImageAnimator(canvas, imageSrc);
      animator.init();
      animator.startAnimation();
      
    }
  });
});