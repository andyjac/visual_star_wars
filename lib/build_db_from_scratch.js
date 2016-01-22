var async = require('async');
var sequelize = require('../models').sequelize;

(function buildDbFromScratch() {
  sequelize.sync({ force: true });

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
