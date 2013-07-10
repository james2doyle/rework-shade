/**
 * Module dependencies.
 */

var parse = require('color-parser'),
    visit = require('rework-visit'),
    converter = require('color-convert');

module.exports = function() {
  /**
   * Substitute shade function.
   *
   */

  function substitute(decl) {
    var repeat = false,
        value = decl.value;

    do {
      var regex = /(shade\((?:#(([a-f]|[A-F]|\d){3})|#([a-f]|[A-F]|\d){6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*\d*\.?\d*\s*\))\s*,\s*-?\d+\))/g;
      var shadeStatements = value.match(regex);
      if(shadeStatements) {
        repeat = true; // Allow for nested statements
        shadeStatements.forEach(processShadeStatement);
      }
      else
        repeat = false;
    } while(repeat);

    return value;

    function processShadeStatement(statement) {
      // grab rgba(...) value
      var color = statement.split('shade(')[1];
      // color
      var colorObj = color.slice(0, color.lastIndexOf(','));
      colorObj = parse(colorObj);
      // amount
      var amount = color.slice(color.lastIndexOf(',') + 1, color.length-1);

      //Convert to HSL
      var hslVal = converter.rgb2hslRaw(colorObj.r, colorObj.g, colorObj.b);

      // Mutate the lightness attribute
      hslVal[2] += amount > 0
        ? (100 - hslVal[2]) * amount / 100
        : hslVal[2] * (amount / 100);

      // Convert it back
      var rgbVal = converter.hsl2rgb(hslVal);
      colorObj.r = rgbVal[0]; colorObj.g = rgbVal[1]; colorObj.b = rgbVal[2];

      var alpha = (colorObj.a === 1) ? '': ', '+colorObj.a;
      var type = (alpha !== '') ? 'rgba': 'rgb';

      // format
      var fullColor = type + '(' + colorObj.r + ', ' + colorObj.g + ', ' + colorObj.b + alpha + ')';
      // Replace
      value = value.split(statement).join(fullColor);
    }
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
