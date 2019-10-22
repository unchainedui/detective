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
export const is2x = isHDPI && window.devicePixelRatio > 1.5 && window.devicePixelRatio < 2.5;
export const is3x = isHDPI && window.devicePixelRatio > 2.5;
export const isSmaller = size => screen.width <= size || screen.height <= size;
export const isLarger = size => screen.width > size || screen.height > size;
export const isGeolocation = !!navigator.geolocation;
export const isCSSOM = window.CSS && CSS.number;
export const isTouch = !!('ontouchstart' in window);

export function hdpiImg(obj, img, defaultImg = '') {
  if (obj) {
    return is2x ? obj[img + '@2x'] : is3x ? obj[img + '@3x'] : obj[img];
  }

  return defaultImg;
}

export const browser = (function() {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'IE',
      version: tem[1] ? parseFloat(tem[1]) : null
    }
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem !== null) {
      return {
        name: tem[1].replace('OPR', 'Opera'),
        version: parseFloat(tem[2])
      }
    }
  }

  M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];

  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1]);
  }

  return {
    name: M[0],
    version: parseFloat(M[1])
  }
})();

