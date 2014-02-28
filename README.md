# FreeAlways Frontend

## Introduction

This is the frontend web application that will power FreeAlways.

It's still in the planning stages, so there's not much to see yet.

See also: [FreeAlways Backend](https://github.com/supernovus/fabackend/)

## Runtime Requirements

The Freealways frontend is quite minimalistic and modular, and has only the
following runtime dependencies:

 * [jQuery 2.x](http://jquery.com/)
 * [Riot.js](https://moot.it/riotjs/)
 * [Moment.js](http://momentjs.com/)
 * [Semantic UI](http://semantic-ui.com/)

All runtime requirements will be downloaded and configured as desired by
the build process.

## Build Requirements

The build is only tested on GNU/Linux, but should work on any Unix-like
operating system or environment (Cygwin would be a good test target.)

 * Standard GNU tools (cat, mkdir, mv, rm, etc.)
 * make (only GNU make is tested)
 * wget
 * unzip
 * uglifyjs (sudo npm install -g uglify-js)
 * uglifycss (sudo npm install -g ugifycss)

Just type 'make' and let it go.

## Author

[Timothy Totten](https://github.com/supernovus/)

## License

[Artistic License 2.0](http://www.perlfoundation.org/artistic_license_2_0)

