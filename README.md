# paramnames

Returns function parameter names using the acorn parser, thus slower than regex implementations.
Works with all kinds of functions and parameters.
Deconstructed parameter names are undefined.

[![npm version](https://badge.fury.io/js/paramnames.svg)](https://badge.fury.io/js/paramnames)

# API

```ts
getParameterNames(fn: Function): Array<string | undefined>
```

# Examples

```js
const getParameterNames = require("paramnames");

function add(a, b) {
  return a + b;
}

console.log(getParameterNames(add)); // ["a", "b"]
```

```js
const getParameterNames = require("paramnames");

const fn = (a, [b, c], ...d) => {};

console.log(getParameterNames(fn)); // ["a", undefined, "d"]
```

```js
const getParameterNames = require("paramnames");

const obj = {
  async *fn(a = (1, 2, 3), b = [{}, x => {}], { x, y: { z } }, ...rest) {}
};

console.log(getParameterNames(obj.fn)); // ["a", "b", undefined, "rest"]
```
