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
  .option('customTraits', {})
  .option('sendResult', true);

/**
 * Initialize.
 *
 * @api public
 */

Perimeterx.prototype.initialize = function() {
  // put your initialization logic here
  if (this.options.sendResult) {
    window[this.options.appId + '_asyncInit'] = function(px) {
      px.Events.on('score', function(result) {
        var traits = {};
        traits.pxResult = result;
        this.analytics.identify(traits);
      });
    };
  }
  var p = document.getElementsByTagName('script')[0];
  var s = document.createElement('script');
  s.async = 1;
  s.src = '//client.perimeterx.net/' + this.options.appId + '/main.min.js';

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
  // what are required properties or functions that you need available on the `window`
  // before the integration marks itself as ready?
  window._pxAppId = this.options.appId;

  // iterate over customTraits and set is as pxParam
  // window._pxParam1 = "<param1>";
  var traits = this.options.customTraits;
  var elements = Object.keys(traits);
  elements.forEach(function(key, i) {
    window['_pxParam' + (1 + i)] = traits[key];
  });
  return true;
};

