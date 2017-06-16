'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integrationTester = require('@segment/analytics.js-integration-tester');
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var Perimeterx = require('../lib/');

describe('Perimeterx', function() {
  var analytics;
  var perimeterx;
  var options = {
    appId: '', // FIXME test appId account
    customTraits: {
      'perimeterxCustomParameter': 'segmentTrait'
    } // FIXME test custom traits
  };

  beforeEach(function() {
    analytics = new Analytics();
    perimeterx = new Perimeterx(options);
    analytics.use(integrationTester);
    analytics.use(Perimeterx);
    analytics.add(perimeterx);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    perimeterx.reset();
    sandbox();
  });

  it('should have the correct options', function() {
    analytics.compare(Perimeterx, integration('Perimeterx')
    .option('appId', '')
    .option('customTraits', {}));
  });

  describe.skip('before loading', function() {
    beforeEach(function() {
      analytics.stub(perimeterx, 'load'); // FIXME
    });

    describe.skip('#initialize', function() {
      // write assertions here if you do any logic to create or set things in the `.initialize()` function

      it('should call load', function() {
        analytics.initialize();
        analytics.called(perimeterx.load);
      });
    });
  });

  describe.skip('loading', function() {
    it('should load', function(done) {
      analytics.load(perimeterx, done); // FIXME
    });
  });

  describe.skip('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
    });
  });
});
