const addRecord = require('./controller/addRecord.js');
const getBalance = require('./controller/getBalance.js');

/*
* Collection of the different functions of the wallet api.
* They are called by the router:
*/

const walletApi = {
  addRecord,
  getBalance
};

module.exports = walletApi;
