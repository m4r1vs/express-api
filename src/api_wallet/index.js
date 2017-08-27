const addRecord = require('./controller/addRecord.js');
const getBalance = require('./controller/getBalance.js');
const updateCrypto = require('./controller/updateCrypto.js');

/*
* Collection of the different functions of the wallet api.
* They are called by the router:
*/

const walletApi = {
  addRecord,
  getBalance,
  updateCrypto
};

module.exports = walletApi;
