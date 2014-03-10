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
 * This method assigns its own callbacks to always(), fail() and done(),
 * which simply trigger "after", "failure" and "success" events respectively,
 * in the Backend object itself.
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
    self.trigger("prepare", data, request);
    if (!request.data)
    { // Default data handling.
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      request.data        = data;
      request.contentType = 'application/json';
    }
  }

  self.trigger("before", request);

  var response = $.ajax(request);

  var transaction = {
    request:  request,
    response: response,
    path:     path,
    data:     data,
  };
 
  response.always(function (var1, var2, var3) {
    self.trigger("after", var1, var2, var3, transaction);
  });

  response.fail(function (jq, status, err) {
    self.trigger("failure", jq, status, err, transaction);
  });

  response.done(function (res, msg, jq) {
    self.trigger("success", res, msg, jq, transaction);
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

  self.on("after", function (var1, var2, var3) {
    console.log("response>", var1, var2, var3);
  });

}

/* End of backend.js */

