var async = require('async');
var helpers = require('./helpers');

function buildDbFromScratch() {
  console.log('\nBuilding database...\n')

  async.waterfall([
    require('./scrape_api'),
    require('./format_data'),
    require('./save_all_records'),
    require('./set_all_associations')
  ], function(err) {
    if (err) {
      return handleError(err);
    }

    console.log('\nDatabase built successfully');
    process.exit(0);
  });
}


function handleError(err) {
  helpers.handleProcessError(err);
  console.log('\nStarting over...');

  return buildDbFromScratch();
}

module.exports = buildDbFromScratch;
