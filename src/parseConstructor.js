const { parse } = require("acorn");

function getConstructor(_class) {
  return _class.body.body.find(member => member.kind == "constructor");
}

function parseConstructor(_class) {
  const source = _class.toString();

  if (/^class(?:\s+extends|\s*\{)/.test(source)) {
    const classExpression = parse(`(${source})`).body[0].expression;

    return getConstructor(classExpression);
  }

  const classDeclaration = parse(source).body[0];

  return getConstructor(classDeclaration);
}

module.exports = parseConstructor;
