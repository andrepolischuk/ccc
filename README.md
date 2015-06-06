# ccc [![Build Status](https://travis-ci.org/andrepolischuk/ccc.svg?branch=master)](https://travis-ci.org/andrepolischuk/ccc)

  > Color conversions and transformations

## Install

```sh
npm install --save ccc
```

```sh
component install andrepolischuk/ccc
```

## API

### ccc(str)

  Create color via string

```js
var color = ccc('black');
var color = ccc('#ffffff');
var color = ccc('rgb(255, 0, 0)');
var color = ccc('rgba(255, 0, 0, 0.5)');
var color = ccc('hsl(240, 100%, 50%)');
var color = ccc('hsla(240, 100%, 50%, 0.7)');
```

### ccc(obj)

  Create color via object

```js
var color = ccc({r: 255, g: 0, b: 0});
var color = ccc({r: 255, g: 0, b: 0, a: 0.5});
var color = ccc({c: 100, m: 0, y: 100, k: 0});
var color = ccc({h: 240, s: 100, l: 50});
var color = ccc({h: 60, s: 100, v: 100});
```

### ccc.rgb(...arguments)

  Create color via arguments

```js
var color = ccc.keyword('black');
var color = ccc.hex('ffffff');
var color = ccc.rgb(255, 0, 0);
var color = ccc.rgb(255, 0, 0, 0.5);
var color = ccc.cmyk(100, 0, 100, 0);
var color = ccc.hsl(240, 100, 50);
var color = ccc.hsl(240, 100, 50, 0.7);
var color = ccc.hsv(60, 100, 100);
```

### ccc.rgb(arr)

  Create color via array

```js
var color = ccc.rgb([255, 0, 0]);
var color = ccc.rgb([255, 0, 0, 0.5]);
var color = ccc.cmyk([100, 0, 100, 0]);
var color = ccc.hsl([240, 100, 50]);
var color = ccc.hsl([240, 100, 50, 0.7]);
var color = ccc.hsv([60, 100, 100]);
```

### .rgb()

  Return converted color object

```js
color.rgb(); // {r: 255, g: 0, b: 0}
color.cmyk(); // {c: 100, m: 0, y: 100, k: 0}
color.hsl(); // {h: 240, s: 100, l: 50}
color.hsv(); // {h: 60, s: 100, v: 100}
```

### .rgbArray()

  Return converted color array

```js
color.rgbArray(); // [255, 0, 0]
color.cmykArray(); // [100, 0, 100, 0]
color.hslArray(); // [240, 100, 50]
color.hsvArray(); // [60, 100, 100]
```

### .rgbString()

  Return converted color string

```js
color.keyword(); // 'black'
color.hex(); // '#ffffff'
color.rgbString(); // rgb(255, 0, 0)
color.hslString(); // hsl(240, 100%, 50%)
```

### .invert()

  Invert color

```js
ccc('#ffffff').invert().hex(); // #000000
```

### .grayscale()

  Convert color to grayscale

```js
ccc('#669900').grayscale().hex(); // #787878
```

### .average(Color2)

  Calculate average

```js
ccc('#333333').average(ccc('#999999')).hex(); // #666666
```

### .light()

  Check if color is light

```js
ccc('white').light(); // true
```

### .dark()

  Check if color is dark

```js
ccc('black').dark(); // true
```

### .lighten(val)

  Lighten color by `val`

```js
ccc('#000000').lighten(50).hex(); // #080808
```

### .darken(val)

  Darken color by `val`

```js
ccc('#ffffff').darken(50).hex(); // #080808
```

### .saturate(val)

  Saturate color by `val`

```js
ccc('gray').saturate(50).saturation(); // 50
```

### .desaturate(val)

  Desaturate color by `val`

```js
ccc('red').desaturate(50).saturation(); // 50
```

### .red([val])

  Return or set red component of RGB

```js
ccc('red').red(); // 255
ccc('black').red(255).keyword(); // red
```

### .green([val])

  Return or set green component of RGB

```js
ccc('green').green(); // 255
ccc('black').green(255).keyword(); // lime
```

### .blue([val])

  Return or set blue component of RGB

```js
ccc('blue').blue(); // 255
ccc('black').blue(255).keyword(); // blue
```

### .alpha([val])

  Return or set alpha component

```js
ccc('rgba(0, 0, 0, 0.5)').alpha(); // 0.5
ccc('black').alpha(0.5).rgbString(); // rgba(0, 0, 0, 0.5)
```

### .cyan([val])

  Return or set cyan component of CMYK

```js
ccc('aqua').cyan(); // 100
ccc('white').cyan(100).keyword(); // aqua
```

### .magenta([val])

  Return or set magenta component of CMYK

```js
ccc('fuchsia').magenta(); // 100
ccc('white').magenta(100).keyword(); // fuchsia
```

### .yellow([val])

  Return or set yellow component of CMYK

```js
ccc('yellow').cyan(); // 100
ccc('white').cyan(100).keyword(); // yellow
```

### .key([val])

  Return or set key component of CMYK

```js
ccc('black').key(); // 100
ccc('white').key(100).keyword(); // black
```

### .hue([val])

  Return or set hue component of HSL

```js
ccc('red').hue(); // 0
ccc('lime').hue(240).keyword(); // blue
```

### .saturation([val])

  Return or set saturation component of HSL

```js
ccc('lime').saturation(); // 100
ccc('gray').saturation(100).keyword(); // red
```

### .lightness([val])

  Return or set lightness component of HSL

```js
ccc('blue').lightness(); // 50
ccc('lime').lightness(25).keyword(); // green
```

### .value([val])

  Return or set value component of HSB

```js
ccc('yellow').value(); // 100
ccc('lime').value(50).keyword(); // green
```

## License

  MIT
