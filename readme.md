# Unchained UI

## Detective

[![NPM Version](https://img.shields.io/npm/v/uc-detective.svg?style=flat-square)](https://www.npmjs.com/package/uc-detective)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-detective.svg?style=flat-square)](https://www.npmjs.com/package/uc-detective)

Collection of simple browser features detection functions


### Usage

Just import features you need to check

```js
import {requestAnimationFrame, isHDPI} from 'uc-detective'
```

### Features

* __requestAnimationFrame__ — function, prefixed or polyfill
* __isCSSOM__ — boolean, CSSOM is supported
* __transform__ — string, prefixed
* __transition__ — string, prefixed
* __transitionEnd__ — string, prefixed
* __isWebkit__ — boolean
* __isHDPI__ — boolean, when devicePixelRatio > 1
* __isSmall__ – boolean, screen smaller than 415px
* __isLarge__ – boolean, hdpi and screen size is bigger than 415px
* __isTouch__ – boolean
* __isGeolocation__ – boolean

### Helpers

#### hdpiImg(imgObj, name)

return coresponded data from the `imgObj`. Example

```js
import { hdpiImg } from 'uc-detective'

const image = {
  'thumb': { url: '/some/image.jpg' },
  'thumb@2x': { url: '/some/image.jpg' }
}

console.log(hdpiImg(image, 'thumb').url)

```

#### hdpiImgDefault(imgObj, name, defaultImg)

same as `hdpiImg` but if not imgObj found returns `defaultImg`

License MIT

© velocityzen

