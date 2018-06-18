const prefix = (() => {
  const styles = window.getComputedStyle(document.documentElement, '');
  const pre = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && [ '', 'o' ])
  )[1];
  return pre[0].toUpperCase() + pre.substr(1);
})();

const prefixed = function(prop, ctx) {
  if (!ctx) {
    ctx = document.documentElement;
  }

  return ctx[prop] ? ctx[prop] : prefix + (prop[0].toUpperCase() + prop.substr(1));
};


const preTransform = prefixed('transform');
const transform = preTransform === 'MsTransform' ? 'msTransform' : preTransform;
const transition = prefixed('transition');
const transitionEnd = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'MsTransition': 'transitionend',
  'transition': 'transitionend'
}[transition];

const isHDPI = window.devicePixelRatio && window.devicePixelRatio > 1;
const isSmall = screen.width < 415 || screen.height < 415;
const isLarge = (isHDPI && !isSmall);

let requestAnimationFrame = prefixed('requestAnimationFrame', window);
if (!requestAnimationFrame) {
  let lastTime = 0;
  requestAnimationFrame = function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

const isGeolocation = !!navigator.geolocation;
const isCSSOM = window.CSS && CSS.number;
const isTouch = !!('ontouchstart' in window);

const hdpiImg = function(obj, img) {
  return isHDPI ? obj[img + '@2x'] : obj[img];
};

const hdpiImgDefault = function(obj, img, defaultImg) {
  return obj ? hdpiImg(obj, img) : defaultImg;
}

const isWebkit = !!navigator.userAgent.match(/webkit/i);

export default {
  requestAnimationFrame,
  transform,
  transition,
  transitionEnd,
  isWebkit,
  isHDPI,
  isCSSOM,
  isSmall,
  isGeolocation,
  isTouch,
  isLarge,
  hdpiImg,
  hdpiImgDefault
}
