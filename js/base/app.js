/**
 * The core application function.
 *
 * Loads loosely-coupled modules which act as the presenter/controllers
 * for the application.
 *
 * Pretty much ripped off entirely from the Riot.js example application.
 */

var instance; // Private storage for our API instance.

root.faapp = riot.observable(function (arg) {
  // faapp() --> return instance
  if (!arg) return instance;

  // faapp(function) --> add a new module
  if ($.isFunction(arg)) {
    root.faapp.on("ready", arg);
  }

  // faapp(conf) --> initialize the application
  else {
    instance = new API(arg);
    instance.on("ready", function() {
      root.faapp.trigger("ready", instance);
    });
  }

  return instance;
});

/* End of app.js */

