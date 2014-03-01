/**
 * A generic promise interface using riot.observable.
 *
 * Taken from the Riot.js example application, and modified to use the
 * riot namespace instead of $, and renamed to SimplePromise to not
 * conflict with the upcoming native Javascript Promise object.
 */

function SimplePromise(fn) {
  var self = riot.observable(this);
  $.map(['done', 'fail', 'always'], function(name) {
    self[name] = function(arg) {
      return self[$.isFunction(arg) ? 'on' : 'trigger'](name, arg);
    };
  });
}

/* End of promise.js */

