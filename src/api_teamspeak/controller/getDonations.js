const request = require('request');
const config = require('../../../config.js');
const helper = require('../../helpers');

const getDonations = (req, res) => {
  /*
  * This function gets fired when /teamspeak/get-donation-amount/ is requested
  * and returns the overall balance of all accounts.
  */

  helper.log(`Request to access ${req.url}`, 36);

  request({ // Use 3rd party libary, vanilla can be complicated
    method: 'GET',
    url: `https://api.tipeeestream.com/v1.0/events.json?apiKey=${config.tipeeeStream.token}&type[]=donation`
  }, (error, response, body) => { // Got response from Tipeee
    helper.log(`Fetch in \x1b[4m${__filename}\x1b[0m\x1b[36m finished`, 36);

    if (response) {
      helper.log(`Status: ${response.statusCode}`, 35);
      helper.log(`Headers: ${JSON.stringify(response.headers)}`, 35);
    } else {
      helper.log("But got no response, maybe offline or an error on the Tipeee-Server?", 31);
    }

    const parsedBody = JSON.parse(body);

    if (parsedBody.datas.items) {
      if (parsedBody.message === 'success') {
        let data = "\n";
        let amount = 16;
        for (let i = 0, len = parsedBody.datas.items.length; i < len; i++) {
          data += `\n- Danke an [color=purple]${parsedBody.datas.items[i].parameters.username}[/color][color=#4A494F] für ${parsedBody.datas.items[i].parameters.amount} Euro [color=red]♥[/color]`;
          amount += parsedBody.datas.items[i].parameters.amount;
        }
        data += "\n- Danke an [color=purple]slayR[/color][color=#4A494F] für 7 Euro [color=red]♥[/color]";
        data += "\n- Danke an [color=purple]Maxi99[/color][color=#4A494F] für 9 Euro [color=red]♥[/color]";
        res.json({ string: data, amount });
      } else {
        res.status(200).json({ error: "ERROR_ON_TEPEEE_SERVER" });
      }
    } else {
      res.status(200).json({ error: "NO_BODY_RECIEVED_FROM_TIPEEE" });
    }
  });
};

module.exports = getDonations;
