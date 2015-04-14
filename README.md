# Ccc

  Colors converter

  [![Build Status](https://travis-ci.org/andrepolischuk/ccc.svg?branch=master)](https://travis-ci.org/andrepolischuk/ccc)

## Instalation

  Browser:

```html
<script src="https://cdn.rawgit.com/andrepolischuk/ccc/0.3.0/ccc.min.js"></script>
```

  Component(1):

```sh
$ component install andrepolischuk/ccc
```

  Npm:

```sh
$ npm install ccc
```

## API

### ccc(str)

  Parse color via string

```js
var color = ccc('black')
var color = ccc('#ffffff')
var color = ccc('rgb(255, 0, 0)')
var color = ccc('rgba(255, 0, 0, 0.5)')
var color = ccc('cmyk(100%, 0%, 100%, 0%)')
var color = ccc('hsl(240, 100%, 50%)')
var color = ccc('hsla(240, 100%, 50%, 0.7)')
var color = ccc('hsv(60, 100%, 100%)')
```

### ccc(obj)

  Parse color via object

```js
var color = ccc({r: 255, g: 0, b: 0})
var color = ccc({r: 255, g: 0, b: 0, a: 0.5})
var color = ccc({c: 100, m: 0, y: 100, k: 0})
var color = ccc({h: 240, s: 100, l: 50})
var color = ccc({h: 60, s: 100, v: 100})
```

### ccc.rgb(...)

  Parse color via arguments

```js
var color = ccc.key('black')
var color = ccc.hex('ffffff')
var color = ccc.rgb(255, 0, 0)
var color = ccc.rgb(255, 0, 0, 0.5)
var color = ccc.cmyk(100, 0, 100, 0)
var color = ccc.hsl(240, 100, 50)
var color = ccc.hsl(240, 100, 50, 0.7)
var color = ccc.hsv(60, 100, 100)
```

### ccc.rgb(arr)

  Parse color via array

```js
var color = ccc.rgb([255, 0, 0])
var color = ccc.rgb([255, 0, 0, 0.5])
var color = ccc.cmyk([100, 0, 100, 0])
var color = ccc.hsl([240, 100, 50])
var color = ccc.hsl([240, 100, 50, 0.7])
var color = ccc.hsv([60, 100, 100])
```

### color.rgb()

  Return converted color object

```js
color.key()
// {key: 'black'}

color.hex()
// {hex: 'ffffff'}

color.rgb()
// {r: 255, g: 0, b: 0}

color.cmyk()
// {c: 100, m: 0, y: 100, k: 0}

color.hsl()
// {h: 240, s: 100, l: 50}

color.hsv()
// {h: 60, s: 100, v: 100}
```

### color.rgbArray()

  Return converted color array

```js
color.keyArray()
// ['black']

color.hexArray()
// ['ffffff']

color.rgbArray()
// [255, 0, 0]

color.cmykArray()
// [100, 0, 100, 0]

color.hslArray()
// [240, 100, 50]

color.hsvArray()
// [60, 100, 100]
```

### color.rgbString()

  Return converted color string

```js
color.keyString()
// 'black'

color.hexString()
// '#ffffff'

color.rgbString()
// rgb(255, 0, 0)

color.cmykString()
// cmyk(100%, 0%, 100%, 0%)

color.hslString()
// hsl(240, 100%, 50%)

color.hsvString()
// hsv(60, 100%, 100%)
```

### color.invert()

  Invert color

```js
ccc('#ffffff').invert().hexString()
// #000000
```

### color.grayscale()

  Convert color to grayscale

```js
ccc('#669900').grayscale().hexString();
// #787878
```

### color1.average(color2)

  Calculate average

```js
ccc('#333333').average(ccc('#999999')).hexString()
// #666666
```

## License

  MIT
