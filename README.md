# Ccc

  Colors converter

## Instalation

  Browser:

```html
<script src="https://cdn.rawgit.com/andrepolischuk/ccc/0.1.0/dist/ccc.min.js"></script>
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

### ccc.rgb(color)
### ccc.hex(color)
### ccc.cmyk(color)

  Parse color

```js
var white = ccc.hex('ffffff');
```

### ccc.hex(color).rgb()
### ccc.cmyk(color).rgb()

  Convert color

```js
ccc.hex('ffffff').rgb();
// 255, 255, 255
```

### ccc.rgb(color).invert()

  Invert color

```js
ccc.hex('ffffff').invert().hex();
// 000000
```

### ccc.rgb(color).grayscale()

  Convert color to grayscale

```js
ccc.hex('669900').grayscale().hex();
// 787878
```

## License

  MIT
