import './styles/style.scss';
import { initHeaderAnimation } from './ts/header';
import { initSliders } from './ts/slider';
import { initTrialPromoAnimation } from './ts/trialPromo';
import { initTextAnimations } from './ts/textAnimation';
import { PixelImageAnimator } from './ts/pixelImageAnimator';
import { initScreenAnimator } from './ts/fullScreenAnim';

const awardsImage = require('./assets/images/anim-img/sm-awards-img.png') as string;
const bannerImage = require('./assets/images/anim-img/banner-img.png') as string;
const voteImage = require('./assets/images/anim-img/vote-img.png') as string;
const retrogradeImage = require('./assets/images/anim-img/retrograde-img.png') as string;
const agencyImage = require('./assets/images/anim-img/agency-img.png') as string;
const youngImage = require('./assets/images/anim-img/young-img.png') as string;
const regionsImage = require('./assets/images/anim-img/regions-img.png') as string;
const confImage = require('./assets/images/anim-img/conf-img.png') as string;
const aboutImage = require('./assets/images/anim-img/about-img.jpg') as string;

const image1 = require('./assets/images/trial/img-0.png') as string;
const image2 = require('./assets/images/trial/img-1.png') as string;
const image3 = require('./assets/images/trial/img-2.png') as string;
const image4 = require('./assets/images/trial/img-3.png') as string;
const image5 = require('./assets/images/trial/img-4.png') as string;

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

const images = [
  { src: image1, width: 57, height: 23 },
  { src: image2, width: 36, height: 29 },
  { src: image3, width: 25, height: 30 },
  { src: image4, width: 27, height: 46 },
  { src: image5, width: 27, height: 41 }
];

const container = document.querySelector<HTMLElement>('.promo__img-container') as HTMLElement;
  initScreenAnimator();
  initHeaderAnimation();
  initSliders();
  initTrialPromoAnimation(container, images);
  initTextAnimations();

  const canvases = document.querySelectorAll<HTMLCanvasElement>('.pixel-animation');
  canvases.forEach((canvas) => {
    const imageType = canvas.dataset.imageType as keyof ImageMap;
    const imageSrc = imageType ? imageMap[imageType] : null;

    if (imageSrc) {
      const animator = new PixelImageAnimator(canvas, imageSrc);
      animator.init();      
    }
  });
});

    