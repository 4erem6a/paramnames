declare module "paramnames" {
  /**
   * Returns parameter names of a function.
   * Deconstructed parameter names are undefined.
   */
  function getParameterNames(fn: Function): Array<string | undefined>;

  export = getParameterNames;
}
