/**
 * The Backend class.
 *
 * It handles the actual web service calls to the FaBackend component.
 * It gets passed the same config file as the API.
 */
function Backend (conf) {
  /**
   * An observable version of ourself.
   */
  var self = riot.observable(this);

  /**
   * Store our base URL.
   */
  self.url = conf.url || '/api';
}

/**
 * A method for sending requests to the backend service, and processing
 * the replies returned from it.
 *
 * This returns a jQuery Deferred object, to which you should use the
 * .done() and .fail() handlers to assign callbacks.
 *
 * This method itself assigns its own callbacks to always(), fail() and done(),
 * which simply trigger a corresponding event in the Backend object itself.
 * This can be useful if you want to do logging or debugging on all requests.
 */
Backend.prototype.sendRequest (type, path, data) {
  var self = this;
  var url  = self.url + path;

  var request = {
    type:     type,
    url:      url,
    dataType: 'json',
  };

  if (data) {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }
    request.data        = data;
    request.contentType = 'application/json';
  }

  self.trigger("before", request);

  var response = jQuery.ajax(request);
 
  response.always(function (var1, var2, var3) {
    self.trigger("always", var1, var2, var3);
  });

  response.fail(function (jq, status, err) {
    self.trigger("fail", jq, status, err);
  });

  response.done(function (res, msg, jq) {
    self.trigger("done", res, msg, jq);
  });

  return response;
}

/**
 * Enable debugging.
 *
 * Adds callbacks to the "before" and "always" events that log the
 * request and response respectively.
 *
 * Usage from Javascript debugging console:
 *
 *  faapp().backend.enableDebugging();
 *
 */
Backend.prototype.enableDebugging = function () {
  var self = this;

  self.on("before", function (request) {
    console.log("request>", request);
  });

  self.on("always", function (var1, var2, var3) {
    console.log("response>", var1, var2, var3);
  });

}

/* End of backend.js */

