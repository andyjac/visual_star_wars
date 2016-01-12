#!/usr/bin/env node

var async = require('async');
var helpers = require('./helpers');

(function() {
  async.waterfall([
    require('./scrape_api'),
    require('./format_data'),
    require('./save_all_records'),
    require('./set_all_associations')
  ], function(err) {
    if (err) {
      return helpers.handleProcessError(err);
    }

    console.log('\nDatabase built successfully');
    process.exit(0);
  });
})();
