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
}

/**
 * Start the application.
 */
API.prototype.start = function () {
  this.trigger("ready");
}

/**
 * A factory function to add the simplest type of wrapper methods
 * to the API. It doesn't get much simpler than this.
 */
function addAPI (methodName) {
  API.prototype[methodName] = function () {
    var self = this;
    self.backend[methodName].apply(self.backend, arguments)
      .done(function (data) {
        self.trigger(methodName, data);
      })
    ;
  }
}

/* End of api.js */

