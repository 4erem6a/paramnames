const getParameterNames = require("..");

expect.extend({
  toHaveParameterNames(receiver, names) {
    const parameterNames = getParameterNames(receiver);

    expect(parameterNames).toEqual(names);

    return { pass: true };
  }
});

test("Plain function", () => {
  async function f(a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) {}

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Anonymous function", () => {
  const f = async function(
    a,
    b = (1, 2, 3),
    [x, y, z],
    c = [{}, (a, b, c) => {}],
    ...rest
  ) {};

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Arrow function", () => {
  const f = async (a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) => {};

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Single argument arrow function", () => {
  const f = async x => {};

  expect(f).toHaveParameterNames(["x"]);
});

test("Method", () => {
  const obj = {
    async f(a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) {}
  };

  expect(obj.f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Plain generator", () => {
  async function* f(a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) {}

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Anonymous generator", () => {
  const f = async function*(
    a /* () => {} */,
    b = (1, 2, 3),
    [x, y, z],
    c = [{}, (a, b, c) => {}],
    ...rest
  ) {};

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Generator method", () => {
  const obj = {
    async *f(
      a /* () => {} */,
      b = (1, 2, 3),
      [x, y, z],
      c = [{}, (a, b, c) => {}],
      ...rest
    ) {}
  };

  expect(obj.f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Generator method (string literal name)", () => {
  const obj = {
    async *f(a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) {}
  };

  expect(obj.f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Generator method (computed name)", () => {
  const sample = "sample";
  const property = "property";

  const obj = {
    async *[`${sample} ` + property](
      a,
      b = (1, 2, 3),
      [x, y, z],
      c = [{}, (a, b, c) => {}],
      ...rest
    ) {}
  };

  expect(obj["sample property"]).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Class constructor", () => {
  class Sample {
    constructor(a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) {}
  }

  expect(Sample).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Class without constructor", () => {
  class Sample {}

  expect(Sample).toHaveParameterNames([]);
});

test("Anonymous class", () => {
  const Sample = class {
    constructor(a, b = (1, 2, 3), [x, y, z], c = [{}, (a, b, c) => {}], ...rest) {}
  };

  expect(Sample).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Anonymous class without constructor", () => {
  const Sample = class {};

  expect(Sample).toHaveParameterNames([]);
});

test("Inherited constructor", () => {
  class Base {
    constructor(a, b) {}
  }

  class Child extends Base {}

  expect(Child).toHaveParameterNames(["a", "b"]);
});

test("Overridden constructor", () => {
  class Base {
    constructor(a, b) {}
  }

  class Child1 extends Base {}

  class Child2 extends Child1 {
    constructor(c, d) {}
  }

  class Child3 extends Child2 {}

  expect(Child3).toHaveParameterNames(["c", "d"]);
});

test("Native functions", () => {
  expect(console.log).toHaveParameterNames([]);

  expect(isNaN).toHaveParameterNames([]);

  expect(Object).toHaveParameterNames([]);

  expect(Number).toHaveParameterNames([]);

  expect(Boolean).toHaveParameterNames([]);

  expect(String).toHaveParameterNames([]);

  expect(Proxy).toHaveParameterNames([]);
});

test("'async' method", () => {
  const fn = {
    async(a, b) {}
  }.async;

  expect(fn).toHaveParameterNames(["a", "b"]);
});
