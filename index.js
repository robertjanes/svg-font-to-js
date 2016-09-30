/*
  fontToPaths

  Converts an SVG font file into an
  array of SVG paths with labels.
*/

'use strict';
const fs = require('fs');

function fontToPaths(fontPath, options) {
  svgFontCheck(fontPath);

  let benchmark;
  if (options.benchmark) benchmark = process.hrtime();

  const prettifySvg = options
    ? prettifyCheck(options)
    : false;
  const fontFile = fs.readFileSync(fontPath, 'utf8');
  const font = [];
  // Regex below returns results 0–4:
  // 0 = full <glyph> tag, 2 = glyph width, 1 = glyph name, 3 = glyph path
  const regex = /<glyph glyph-name="(.*?)"(?:.*?|\s*?)horiz-adv-x="(.*?|)"(?:.*?|\s*?)d="((.|\s)*?)"(?:.*?|\s*?)\/>/g;
  let match;
  while ((match = regex.exec(fontFile)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }
    font.push({
      name: match[1],
      width: parseInt(match[2]),
      path: prettifySvg ? prettifySvg(match[3]): match[3]
    });
  }
  
  if (options.benchmark) {
    const endParse = process.hrtime(benchmark);
    console.log('svg-font-to-js parse took ' + endParse[0] + 's, ' + (endParse[1] * 1e-6).toFixed(2) + 'ms.');
  }
  return font;
}

function prettifyCheck(options) {
  return options.prettify
    ? require('svg-path-prettify')
    : null;
}

function svgFontCheck(fontPath) {
  if (fontPath.indexOf('.svg') == -1) throw new Error('File passed not an SVG font.');
}

module.exports = fontToPaths;
