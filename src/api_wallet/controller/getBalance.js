const request = require('request');
const helper = require('../../helpers');
const config = require('../../../config.js');

const getBalance = (req, res) => {
  /*
  * This function gets fired when /wallet/get-balance/ is requested and
  * returns the overall balance of all accounts. It does only require a
  * valid token in the requests body.
  */

  helper.log(`Request to access ${req.url}`, 36);
  helper.log(`Token is ${config.walletCredentials.token}`, 36);
  request({ // Use 3rd party libary, vanilla can be complicated
    method: 'GET',
    url: 'https://api.budgetbakers.com/api/v1/balance',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': config.walletCredentials.token, // Token from Config.js
      'X-User': config.walletCredentials.mail // Email from Config.js
    }
  }, (error, response, body) => { // Got response from Wallet
    helper.log(`Fetch in \x1b[4m${__filename}\x1b[0m\x1b[36m finished`, 36);

    if (response) {
      helper.log(`Status: ${response.statusCode}`, 35);
      helper.log(`Headers: ${JSON.stringify(response.headers)}`, 35);
      helper.log(`Response: ${body}`, 35);
    } else {
      helper.log("But got no response, maybe offline or an error on the Wallet-Server?", 31);
    }

    // Respond with the balance if recieved. Example: {"amount":42}
    if (body) res.json(JSON.parse(body));
    else res.status(200).json({ error: "NO_BODY_RECIEVED_FROM_WALLET" });
  });
};

module.exports = getBalance;
