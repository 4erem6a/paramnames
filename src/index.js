const parseFunction = require("./parseFunction");

function getParameterNames(fn) {
  if (typeof fn != "function") {
    return undefined;
  }

  const params = parseFunction(fn).params;

  return params
    .map(param => {
      if (param.type == "AssignmentPattern") {
        return param.left;
      }

      if (param.type == "RestElement") {
        return param.argument;
      }

      return param;
    })
    .map(param => param.name);
}

module.exports = getParameterNames;
