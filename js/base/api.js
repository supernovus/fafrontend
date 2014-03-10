/**
 * The API Base class
 *
 * This will be populated with methods to manipulate our data, using the
 * FaBackend web service.
 */
function API (conf) {
  /**
   * An observable reference to ourself.
   */
  var self = riot.observable(this);

  /**
   * Store a copy of our configuration object.
   */
  self.conf = conf;

  /**
   * Our backend object.
   */
  self.backend = new Backend(conf);

  /**
   * Call our init scripts.
   */
  self.init(conf);
}

/**
 * A magical function, that simply look through its own properties,
 * and if they are functions, calls them in the context of its parent,
 * passing on the options passed to it.
 */
API.prototype.init = function () {
  for (var init = this.init) {
    if (typeof this.init[init] === "function") {
      this.init[init].apply(this, arguments);
    }
  }
}

/**
 * Start the application.
 */
API.prototype.start = function () {
  this.trigger("ready");
}

/**
 * Add a simple wrapper method to the API.
 *
 * The method simply calls a method of the same name on the backend,
 * and triggers various events depending on the results.
 * If you need more control, create a standalone method instead.
 *
 * This is a factory method, that is attached to the API class itself,
 * these calls must be done before creating an instance of the API.
 */
API.addMethod = function (methodName) {
  API.prototype[methodName] = function () {
    var self = this;
    self.trigger("before:"+methodName);
    self.backend[methodName].apply(self.backend, arguments)
      .done(function (data) {
        self.trigger(methodName, data);
      })
      .fail(function () {
        self.trigger("fail:"+methodName);
      })
    ;
  }
}

/**
 * Add an init script.
 *
 * This is also a factory method, attached to the API class itself.
 */
API.addInit = function (name, func) {
  API.prototype.init[name] = func;
}

/* End of api.js */

