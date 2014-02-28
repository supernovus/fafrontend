/**
 * A generic promise interface using riot.observable.
 *
 * Taken from the Riot.js example application, and modified to use the
 * riot namespace instead of $.
 */

function Promise(fn) {
  var self = riot.observable(this);
  $.map(['done', 'fail', 'always'], function(name) {
    self[name] = function(arg) {
      return self[$.isFunction(arg) ? 'on' : 'trigger'](name, arg);
    };
  });
}

/* End of promise.js */

