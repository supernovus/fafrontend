
})(
jQuery,                              // jQuery must exist. 
window.riot ? window.riot            // If 'riot' exists, use it.
  : jQuery.observable ? jQuery       // If jQuery has riot methods, use it.
  : $,                               // Assume a standalone $ exists.
moment                               // Moment must exist.
);

/* End of application. */
