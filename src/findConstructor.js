const parseConstructor = require("./parseConstructor");
const isNative = require("./isNative");

function findConstructor(_class) {
  let currentClass = _class;
  let currentPrototype = Object.getPrototypeOf(currentClass);
  let constructor = parseConstructor(currentClass);

  while (!constructor && !isNative(currentPrototype)) {
    currentClass = currentPrototype;
    currentPrototype = Object.getPrototypeOf(currentClass);
    constructor = parseConstructor(currentClass);
  }

  return constructor;
}

module.exports = findConstructor;
