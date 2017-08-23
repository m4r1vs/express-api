const request = require('request');
const helper = require('../../helpers');
const config = require('../../../config.js');

/*
  This Script isn't connected to the API directly.
  It's invoked once a day by a cronjob.
*/

const fundAlert = (funds) => {
  console.log("Funds: ", funds);
  const bodySend = {
    value1: funds
  };

  console.log("body: ", JSON.stringify(bodySend));

  if (funds <= 300) {
    request({ // Use 3rd party libary, vanilla can be complicated..
      method: 'POST',
      url: 'https://maker.ifttt.com/trigger/not_enough_money/with/key/ThCQM1zbijz7sg9-Cg-nknh0DXI1koIynYFKF2yMMQ',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodySend) // Body has to be JSON:ised
    }, (error, response, body) => { // Got response from Wallet:
      helper.log(`Fetch in \x1b[4m${__filename}\x1b[0m\x1b[36m finished`, 36);

      if (response) {
        helper.log(`Status: ${response.statusCode}`, 36);
        helper.log(`Headers: ${JSON.stringify(response.headers)}`, 36);
        helper.log(`Response: ${body}`, 36);
      } else {
        helper.log("But got no response, maybe offline or an error on the Server?", 31);
      }
    });
  }
};

request({ // Use 3rd party libary, vanilla can be complicated
  method: 'GET',
  url: `https://maniyt.de/api/wallet/get-balance?token=${config.general.token}`
}, (error, response, body) => { // Got response from Wallet
  helper.log(`Fetch in \x1b[4m${__filename}\x1b[0m\x1b[36m finished`, 36);

  if (response) {
    helper.log(`Status: ${response.statusCode}`, 35);
    helper.log(`Headers: ${JSON.stringify(response.headers)}`, 35);
    helper.log(`Response: ${body}`, 35);
    const parsedBody = JSON.parse(body);
    console.log(parsedBody);
    fundAlert(parsedBody.amount);
  } else {
    helper.log("But got no response, maybe offline or an error on the Server?", 31);
  }
});
