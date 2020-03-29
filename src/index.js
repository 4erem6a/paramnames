const isClass = require("./isClass");
const findConstructor = require("./findConstructor");
const parseFunction = require("./parseFunction");
const getParameterNames = require("./getParameterNames");

function parseAndGetParameterNames(fn) {
  if (typeof fn != "function") {
    return undefined;
  }

  if (isClass(fn)) {
    const constructor = findConstructor(fn);

    return (constructor && getParameterNames(constructor)) || [];
  }

  const parsedFn = parseFunction(fn);

  return parsedFn && getParameterNames(parsedFn);
}

module.exports = parseAndGetParameterNames;
