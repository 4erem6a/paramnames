function isNative(fn) {
  return /^function.+\{\s*\[\s*native code\s*\]\s*\}$/.test(fn.toString());
}

module.exports = isNative;
