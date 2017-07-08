'use strict';

/**
 * Module dependencies.
 */

var integration = require('@segment/analytics.js-integration');
var each = require('@ndhoule/each');

/**
 * Expose `Perimeterx` integration.
 */

var Perimeterx = module.exports = integration('Perimeterx')
  .option('appId', '')
  .option('customTraits', {})
  .tag('<script src="//client.perimeterx.net/{{ appId }}/main.min.js">');

/**
 * Initialize.
 *
 * @api public
 */

Perimeterx.prototype.initialize = function() {
  window._pxAppId = this.options.appId || '';
  window[this.options.appId + '_asyncInit'] = function(px) {
    px.Events.on('score', function(result) {
      var traits = {};
      traits.pxResult = result;
      this.analytics.identify(traits);
    });
  };
  var p = document.getElementsByTagName('script')[0];
  var s = document.createElement('script');
  s.async = 1;

  p.parentNode.insertBefore(s, p);

  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @api public
 * @return {boolean}
 */

Perimeterx.prototype.loaded = function() {
  return !!(window._pxAppId && window[this.options.appId + '_asyncInit']);
};

/**
 * Identify.
 *
 * Users have the ability to send custom traits to perimeterx. At some point perimeterx checks the
 * window object for these traits so no outbound call is made to perimeterx here.
 *
 * @api public
 * @param {Object} identify
 */

Perimeterx.prototype.identify = function(identify) {
  // iterate over customTraits and set is as pxParam
  // window._pxParam1 = "<param1>";
  var customTraits = this.options.customTraits;
  var traits = identify.traits();

  each(function(trait, key) {
    if (traits[trait]) {
      window[key] = traits[trait];
    }
  }, customTraits);
};
