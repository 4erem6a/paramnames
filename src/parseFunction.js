const isNative = require("./isNative");
const { parse, isIdentifierChar } = require("acorn");

function parseFunction(fn) {
  if (isNative(fn)) {
    return undefined;
  }

  const source = fn
    .toString()
    .replace(/^async/, "")
    .trimLeft();

  if (/^function\s*\*?\s*\(/.test(source)) {
    // function () {}
    return parse(`(${source})`).body[0].expression;
  }

  if (/^function/.test(source)) {
    // function f() {}
    return parse(source).body[0];
  }

  if (/^\(/.test(source)) {
    // () => {}
    return parse(source).body[0].expression;
  }

  if (/^(?:\[|\"|\')/.test(source)) {
    // [...]() => {} | "..."() => {} | '...'() => {}
    return parse(`({ ${source} })`).body[0].expression.properties[0].value;
  }

  let position = 1;

  while (isIdentifierChar(source.charCodeAt(position))) {
    position++;
  }

  if (/^=>/.test(source.substr(position).trimLeft())) {
    // x => {}
    return parse(source).body[0].expression;
  }

  // f() {}
  return parse(`({ ${source} })`).body[0].expression.properties[0].value;
}

module.exports = parseFunction;
