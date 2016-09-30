# svg-font-to-js

Parses an SVG font to JS.

Returns an array of glyph objects in the following format:

```javascript
[
  {
    "name": "dotlessi",
    "width": 330,
    "path": "M 110 0 v 540 h 110 v -540 h -110 z"
  }
]
```

## Options

Options are passed as an object.

```javascript
svgFontToJson('font.svg', {prettify: true, benchmark: true});
```

### Prettify

Outputs cleaner SVG paths. Without prettify:

```javascript
'M110 613v115h124v-115h-124z'
```

With prettify:

```javascript
'M 110 613 v 115 h 124 v -115 h -124 z'
```

### Benchmark

Provides a report on the parse performance.

```shell
svg-font-to-js took 0s, 0.57ms to parse test-font.svg (165 glyphs).
```
