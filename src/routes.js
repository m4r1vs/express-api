const walletApi = require('./api_wallet');
const teamspeakApi = require('./api_teamspeak');
const cafMenuApi = require('./api_sdss_caf_menu');

module.exports = (app) => {
  // handled by /api_wallet/controller/addRecord.js:
  app.route('/wallet/add-record/')
    .post(walletApi.addRecord);

  // handled by /api_wallet/controller/getBalance.js:
  app.route('/wallet/get-balance/')
    .get(walletApi.getBalance);

  // handled by /api_wallet/controller/getBalance.js:
  app.route('/wallet/update-crypto/')
    .post(walletApi.updateCrypto);

  // handled by /api_teamspeak/controller/getDonations.js:
  app.route('/teamspeak/get-donations/')
    .get(teamspeakApi.getDonations);

  app.route('/caf-menu/get-menu')
    .get(cafMenuApi.getMenu);
};
