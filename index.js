const prefix = (() => {
  const styles = window.getComputedStyle(document.documentElement, '');
  const pre = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && [ '', 'o' ])
  )[1];
  return pre[0].toUpperCase() + pre.substr(1);
})();

const prefixed = (prop, ctx) => {
  if (!ctx) {
    ctx = document.documentElement;
  }

  return ctx[prop] ? ctx[prop] : prefix + (prop[0].toUpperCase() + prop.substr(1));
};

export const requestAnimationFrame = (() => {
  const rAF = prefixed('requestAnimationFrame', window);
  if (rAF) {
    return rAF;
  }

  let lastTime = 0;
  return function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }
})();

const preTransform = prefixed('transform');
export const transform = preTransform === 'MsTransform' ? 'msTransform' : preTransform;
export const transition = prefixed('transition');
export const transitionEnd = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'MsTransition': 'transitionend',
  'transition': 'transitionend'
}[transition];

export const isHDPI = window.devicePixelRatio && window.devicePixelRatio > 1;
export const isSmall = screen.width < 415 || screen.height < 415;
export const isLarge = (isHDPI && !isSmall);
export const isGeolocation = !!navigator.geolocation;
export const isCSSOM = window.CSS && CSS.number;
export const isTouch = !!('ontouchstart' in window);

export function hdpiImg(obj, img) {
  return isHDPI ? obj[img + '@2x'] : obj[img];
}

export function hdpiImgDefault(obj, img, defaultImg) {
  return obj ? hdpiImg(obj, img) : defaultImg;
}

export const isSafari = /webkit/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);

