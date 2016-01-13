var async = require('async');
var helpers = require('./helpers');

(function buildDbFromScratch() {
  async.waterfall([
    require('./scrape_api'),
    require('./format_data'),
    require('./save_all_records'),
    require('./set_all_associations')
  ], function(err) {
    if (err) {
      console.log('\n* ERROR:', err);
      console.log('\nRestarting...\n');

      return buildDbFromScratch();
    }

    process.exit(0);
  });
})();
