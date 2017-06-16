'use strict';

/**
 * Module dependencies.
 */

var integration = require('@segment/analytics.js-integration');

/**
 * Expose `Perimeterx` integration.
 */

var Perimeterx = module.exports = integration('Perimeterx')
  .option('appId', '')
  .option('customTraits', {});

/**
 * Initialize.
 *
 * @api public
 */

Perimeterx.prototype.initialize = function() {
  // put your initialization logic here

  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @api public
 * @return {boolean}
 */

Perimeterx.prototype.loaded = function() {
  // what are required properties or functions that you need available on the `window`
  // before the integration marks itself as ready?
  return true;
};
