const path = require('path');
const svgFontToJson = require(path.join(__dirname, '..', 'index'));
console.log(svgFontToJson(path.join(__dirname, 'test-font.svg'), {prettify: true}));
