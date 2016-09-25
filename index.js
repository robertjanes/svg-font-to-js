/*
  fontToPaths

  Converts an SVG font file into an
  array of SVG paths with labels.
*/

'use strict';
const fs = require('fs');

function fontToPaths(fontPath) {
  const startParse = process.hrtime();
  svgFontCheck(fontPath);
  const fontFile = fs.readFileSync(fontPath, 'utf8');
  const font = [];
  /*
    Regex below returns results 0–4
      0 = full <glyph> tag
      1 = glyph name
      2 = glyph width
      3 = glyph path
  */
  const regex = /<glyph glyph-name="(.*?)"(?:.*?|\s*?)horiz-adv-x="(.*?|)"(?:.*?|\s*?)d="((.|\s)*?)"(?:.*?|\s*?)\/>/g;
  let match;
  while ((match = regex.exec(fontFile)) !== null) {
    if (match.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    font.push({
      name: match[1],
      width: parseInt(match[2]),
      path: prettifyPath(match[3])
    });
  }
  const endParse = process.hrtime(startParse);
  console.log('fontToPaths parse took ' + endParse[0] + 's, ' + (endParse[1] * 1e-6).toFixed(2) + 'ms.');
  return font;
}

// Adds spaces in-between letters and numbers
function prettifyPath(path) {
  for (let l = 0; l < path.length; l += 1 ) {
    // If a letter
    if (!parseInt(path[l]) && path[l] !== ' ' && path[l] !== '-' && path[l] !== '0' && path[l] !== '\n') {
      // If no space before
      // Don't add space before if first
      if (l !== 0 && path[l - 1] !== ' ') {
        path = path.substring(0, l) + ' ' + path.substring(l);
        l += 1; // Increase counter for next check
      }
      // If no space after
      // Don't add space after if last
      if (l !== path.length - 1 && path[l + 1] !== ' ') path = path.substring(0, l + 1) + ' ' + path.substring(l + 1);
    }
  }
  return path;
}

function svgFontCheck(fontPath) {
  const fontPathSplit = fontPath.split('.');
  if (fontPathSplit[fontPathSplit.length - 1] !== 'svg') throw new Error('File passed not an SVG font.');
}

module.exports = fontToPaths;
