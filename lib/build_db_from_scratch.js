var async = require('async');
var helpers = require('./helpers');

module.exports = function(cb) {
  console.log('\nBuilding database...\n');

  async.waterfall([
    require('./scrape_api'),
    require('./format_data'),
    require('./save_all_records'),
    require('./set_all_associations')
  ], function(err) {
    if (err) {
      return cb(err);
    }

    console.log('\nDatabase built successfully\n');
    cb(null);
  });
};
