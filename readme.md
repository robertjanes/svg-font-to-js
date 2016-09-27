# svg-font-to-js

Parses an SVG font to JS.

Returns an JS array of glyph objects in the following format:

```javascript
[
  {
    "name": "dotlessi",
    "width": 330,
    "path": "M 110 0 v 540 h 110 v -540 h -110 z"
  }
]
```
