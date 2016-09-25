const path = require('path');
const svgFontToJson = require(path.join(__dirname, 'index'));
svgFontToJson(path.join(__dirname, 'test-font.svg'), {prettify: false});
