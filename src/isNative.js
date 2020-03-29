function isNative(fn) {
  return fn.toString() == "function () { [native code] }";
}

module.exports = isNative;
