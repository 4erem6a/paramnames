function isClass(fn) {
  return fn.toString().startsWith("class");
}

module.exports = isClass;
