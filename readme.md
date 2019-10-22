# Unchained UI

## Detective

[![NPM Version](https://img.shields.io/npm/v/uc-detective.svg?style=flat-square)](https://www.npmjs.com/package/uc-detective)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-detective.svg?style=flat-square)](https://www.npmjs.com/package/uc-detective)

Collection of simple browser features detection functions


### Usage

Just import features you need to check

```js
import { requestAnimationFrame, isHDPI } from 'uc-detective'
```

### Features

* __requestAnimationFrame__ — function, prefixed or polyfill
* __isCSSOM__ — boolean, CSSOM is supported
* __transform__ — string, prefixed
* __transition__ — string, prefixed
* __transitionEnd__ — string, prefixed
* __browser__
  - name
  - version
* __isHDPI__ — boolean, when devicePixelRatio > 1
* __is2x__ — boolean, when devicePixelRatio > 1.5 but less than 2.5
* __is3x__ — boolean, when devicePixelRatio > 2.5
* __isSmaller(size)__ – boolean, returns true when screen width of height less than size
* __isLarger(size)__ – boolean, returns true when screen width of height larfer than size
* __isTouch__ – boolean
* __isGeolocation__ – boolean

### Helpers

#### hdpiImg(imgObj, name, defaultImg)

return coresponded data from the `imgObj`. If `imgObj` is false returns optional `defaultImg`. Example:

```js
import { hdpiImg } from 'uc-detective'

const image = {
  'thumb': { url: '/some/image.jpg' },
  'thumb@2x': { url: '/some/image.jpg' }
}

console.log(hdpiImg(image, 'thumb').url)

```

License MIT

© velocityzen

