// Let's start with something simple.
// In this file, a bunch of functions are defined.
// The tests are passing and can be checked in the test folder.
// The goal is to add typing information (as much as possible)

// This first example shows you how to prevent someone from
// calling this function with something else than numbers
// Nothing to do here
export function addNumbers(x: number, y: number): number {
  return x + y;
}

// We might also want to "add" strings:
// Even though the current implementation is the same and could work for
// both strings and numbers, the goal of this function is to add strings.
// By enforcing this in the function signature, we can safely change
// its implementation later
export function addStrings(x: string, y: string): string {
  return x + y;
}

// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Util functions
// Let's start with the util function, since they don't require too much
// knowledge of the TypeScript's type system.

// The identity function simply returns its first argument.
// This function can accept any type!
// But it always returns something of the same type as what was provided.
// Hint: Use a generic type (<T>).
export function identity<T>(item: T): T {
  return item;
}

// ## attempt
// attempt applies the passed in function with the supplied arguments. If the
// function throws an error, the error is being returned. If the function does
// not throw an error, the result is being returned.
export function attempt(func: (...args: any) => any, ...args: any): any {
  try {
    return func(...args);
  } catch (err) {
    return err;
  }
}

// ### constant
// constant returns a function that returns a the passed in value.
export function constant(value: any): any {
  return function (): any {
    return value;
  }
}

// ### noop
// noop can be called with arbitrary arguments, it will always return
// `undefined`.
export function noop(): void { }

Object.defineProperty(Array.prototype, 'fill',
  {
    value: function (value) {
      // Pasos 1-2.
      if (this == null) {
        throw new TypeError('esto es nulo o no definido');
      }
      let O = Object(this);

      // Pasos 3-5.
      let len: number = O.length >>> 0;

      // Pasos 6-7.
      let start: number = arguments[1];
      let relativeStart: number = start >> 0;

      // Paso 8.
      let k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Pasos 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Paso 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Paso 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Paso 13.
      return O;
    }
  }
);

// ### times
// times invokes the passed in iteratee (2nd argument) n times. It returns an
// array of results.
export function times(n: number, iteratee: any[]) {
  // If the fill function doesn't exist then implement it...
  return Array(n).fill().map((o, i) => iteratee(i));
}
