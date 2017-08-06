const walletApi = require('./api_wallet');

module.exports = (app) => {
  // handled by /api_wallet/controller/addRecord.js:
  app.route('/wallet/add-record/')
    .post(walletApi.addRecord);

  // handled by /api_wallet/controller/getBalance.js:
  app.route('/wallet/get-balance/')
    .get(walletApi.getBalance);
};
