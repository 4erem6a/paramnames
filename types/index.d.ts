declare module "paramnames" {
  /**
   * @summary
   * Returns parameter names of a function or undefined if the argument is not a function.
   * If the argument is a class returns the constructor parameter names.
   *
   * @argument fn A class or a function to get parameter names of.
   *
   * @description
   * Deconstructed parameter names are undefined.
   *
   * Native function's parameter names are [].
   *
   * If a class does not have a constructor the function will try to look it up in the prototype.
   * It will go up the inheritance hierarchy until it finds the constructor or hits a native function.
   * If the constructor is still not found, it will return the default constructor's parameter names [].
   */
  function getParameterNames(fn: Function): Array<string | undefined>;

  export = getParameterNames;
}
