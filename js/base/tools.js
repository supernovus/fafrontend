/**
 * Extend an object.
 */
function extendClass (base, sub, methods) {
  sub.prototype = Object.create(base.prototype);
  if (methods) {
    for (var name in methods) {
      sub.prototype[name] = methods[name];
    }
  }
  return sub;
}

/**
 * Add a hidden function to a plain JS object.
 * Useful if you want JSON-serializable objects with methods.
 */
function addHidden = function (object, pname, pfunc) {
  var props = {
    value:        pfunc,
    enumerable:   false,
    configurable: false,
    writable:     false,
  };
  Object.defineProperty(object, pname, props);
}

/**
 * Clone a simple JS object.
 * Note: This currently won't clone any hidden functions, so be careful!
 */
function clone (object) {
  return JSON.parse(JSON.stringify(object));
}

/* End of tools.js */

