var nano = (function() {

  var re = /{%([\s\S]+?)%}/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}|do|end|else|))([\s\S]*)?/g,
    valueExp = /{{(.+?)}}/g;

  function NanoTemplate(html) {
    this.template = _compile(html);
    this.render = function(data) {
      return this.template.call(data, data || {});
    };

    return this;
  };

  // compile html template string into function
  function _compile(html) {
    var code = 'var r=[]; var __temp;\n'

    code += parse(re, html, add);
    code += 'return r.join("");';
    code = 'with(obj || {}){' + code + '}';

    return new Function('obj', code.replace(/[\r\t\n]/g, ''));
  };


  // parse html template string
  function parse(exp, html, parseAction) {
    var match,
      cursor = 0,
      code = "";

    while (match = exp.exec(html)) {
      code += parseAction(html.slice(cursor, match.index));
      code += parseAction(match[1], true);
      cursor = match.index + match[0].length;
    }

    code += parseAction(html.substr(cursor, html.length - cursor));
    return code;
  }

  // handle javascript code interpolate expression
  function add(line, js) {
    var code = "";

    if (js) {
      if (line.match(reExp)) {
        line = line.replace(/\bdo\b/g, '{');
        line = line.replace(/\bend\b/g, '}');
        line = line.replace(/\belse\b/g, '}else{');
        code += line.replace(/\s+/g, " ") + '\n';
      }
    } else {
      if (line.match(valueExp)) {
        code += parse(valueExp, line, addVariable);
      } else if (line != '') {
        code += 'r.push("' + line.replace(/"/g, '\\"').replace(/\r\n|\n/g, "") + '");\n';
      }
    }

    return code;
  }

  // replace variable expression
  function addVariable(line, js) {
    var code = "";

    if (js)
      code = 'r.push(' + line + ');';
    else if (line != '') {
      code = 'r.push("' + line.replace(/"/g, '\\"').replace(/\r\n|\n/g, "") + '");\n';
    }

    return code;
  }

  return {
    Template: NanoTemplate
  }
})();
