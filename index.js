/**
 * Module dependencies.
 */

var parse = require('color-parser'),
  visit = require('rework-visit');

module.exports = function() {
  /**
   * Substitute shade function.
   *
   */

  function substitute(decl) {
    // grab rgba(...) value
    var color = decl.value.split('shade(')[1];
    // color
    var colorObj = color.slice(0, color.lastIndexOf(','));
    colorObj = parse(colorObj);

    // amount
    var amount = color.slice(color.lastIndexOf(',') + 1, color.length-1);
    // what percentage of white(255) is this
    amount = Math.round(2.55 * parseInt(amount, 0));

    for (var key in colorObj) {
      // ignore the alpha
      if (key != 'a') {
        // subtract the value and make sure if doesnt pass 0 or 255
        colorObj[key] = colorObj[key] + amount;
        if (colorObj[key] > 255) {
          colorObj[key] = 255;
        } else if(colorObj[key] < 0) {
          colorObj[key] = 0;
        }
      }
    }
    // store the alpha value if it exists
    var alpha = (colorObj.a === 1) ? '': ', '+colorObj.a;
    var type = (alpha !== '') ? 'rgba': 'rgb';
    // format
    var fullColor = type + '(' + colorObj.r + ', ' + colorObj.g + ', ' + colorObj.b + alpha + ')';

    // replace
    return fullColor;
  }

  return function shade(style) {
    visit(style, function(declarations, node) {
      declarations.forEach(function(decl) {
        if (!decl.value.match(/\bshade\(/)) {
          return;
        }
        decl.value = substitute(decl);
      });
    });
  };
};