function getParameterNames(fn) {
  return fn.params
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
