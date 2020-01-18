const getParameterNames = require("..");

expect.extend({
  toHaveParameterNames(receiver, names) {
    const parameterNames = getParameterNames(receiver);

    expect(parameterNames).toEqual(names);

    return { pass: true };
  }
});

test("Plain function", () => {
  async function f(
    a /* () => {} */,
    b = (1, 2, 3),
    [x, y, z],
    c = [{}, (a, b, c) => {}],
    ...rest
  ) {}

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Anonymous function", () => {
  const f = async function(
    a /* () => {} */,
    b = (1, 2, 3),
    [x, y, z],
    c = [{}, (a, b, c) => {}],
    ...rest
  ) {};

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Arrow function", () => {
  const f = async (
    a /* () => {} */,
    b = (1, 2, 3),
    [x, y, z],
    c = [{}, (a, b, c) => {}],
    ...rest
  ) => {};

  expect(f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Single argument arrow function", () => {
  const f = async x => {};

  expect(f).toHaveParameterNames(["x"]);
});

test("Method", () => {
  const obj = {
    async f(
      a /* () => {} */,
      b = (1, 2, 3),
      [x, y, z],
      c = [{}, (a, b, c) => {}],
      ...rest
    ) {}
  };

  expect(obj.f).toHaveParameterNames(["a", "b", undefined, "c", "rest"]);
});

test("Plain generator", () => {
  async function* f(
    a /* () => {} */,
    b = (1, 2, 3),
    [x, y, z],
    c = [{}, (a, b, c) => {}],
    ...rest
  ) {}

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
