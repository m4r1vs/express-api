const request = require('request');
const helper = require('../../helpers');
const config = require('../../../config.js');

const updateCrypto = (req, res) => {
  /*
  * This function is called by the router when /wallet/update-crypto/ is
  * requested. It gets two values via query and a token in the body of
  * the request.
  */

  helper.log(`Request to access ${req.url}`, 36);

  if ( // Check if amount is a number
    isNaN(req.query.amount_new) || isNaN(req.query.amount_old)
  ) {
    helper.log(`Amount in query in \x1b[4m${__filename}\x1b[0m\x1b[31m is not a number`, 31);
    res.json('{"stat": "Amount in query is not a number. Cant add record."}');
  } else {
    const amount = req.query.amount_new - req.query.amount_old;

    const note = `Development: ${Number(((req.query.amount_new / req.query.amount_old) - 1) * 100).toFixed(7)}% Value: ${Number(req.query.amount_new).toFixed(2)}€`;

    const bodySend = [{ // Wallet API needs these values
      categoryId: ((req.query.btc === 'true') ? "a76b4cfa-063d-4f86-ab64-88e26cc656e4" : "6628899e-515d-4131-b9df-c9814afdf2b4"), // transformed category
      accountId: "5e6db632-a72b-401d-84c8-08bc7f4f10fc", // It's cash
      currencyId: "1fb57c46-e162-4db3-8c31-53c602505e80", // €€€
      amount: Number(amount).toFixed(2), // How much?
      paymentType: "cash", // self explaining
      note, // Note, how many BTC/ETH
      recordState: "cleared" // paid
    }];

    request({ // Use 3rd party libary, vanilla can be complicated..
      method: 'POST',
      url: 'https://api.budgetbakers.com/api/v1/records-bulk',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': config.walletCredentials.token, // Token from Config.js
        'X-User': config.walletCredentials.mail // Email from Config.js
      },
      body: JSON.stringify(bodySend) // Body has to be JSON:ised
    }, (error, response, body) => { // Got response from Wallet:
      helper.log(`Fetch in \x1b[4m${__filename}\x1b[0m\x1b[36m finished`, 36);

      if (response) {
        helper.log(`Status: ${response.statusCode}`, 36);
        helper.log(`Headers: ${JSON.stringify(response.headers)}`, 36);
        helper.log(`Response: ${body}`, 36);
      } else {
        helper.log("But got no response, maybe offline or an error on the Wallet-Server?", 31);
      }

      if (error) { // Just make clear that it was an error:
        res.json({ stat: error });
      } else {
        res.json({ stat: response.statusCode });
      }
    });
  }
};

module.exports = updateCrypto;
