/**
 * Okay, we're using jQuery's "wait until DOM ready" feature to ensure that
 * everything in the HTML is loaded before we initialize the application.
 */

$(function () {
  faapp({
    url: '/api'
  }).start();
});

/* End of init.js */

