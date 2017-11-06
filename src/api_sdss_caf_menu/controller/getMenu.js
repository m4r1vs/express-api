const request = require('request');
const helper = require('../../helpers');

const getMenu = (req, res) => {
  /*
  * This function gets fired when /caf-menu/get-menu/ is requested
  * and returns the cafeteria menu
  */

  helper.log(`Request to access ${req.url}`, 36);

  request({ // Use 3rd party libary, vanilla can be complicated
    method: 'GET',
    url: `http://sdcaf.hungrybeagle.com/menu.php`
  }, (error, response, body) => { // Got response from Tipeee
    helper.log(`Fetch in \x1b[4m${__filename}\x1b[0m\x1b[36m finished`, 36);

    if (response) {
      helper.log(`Status: ${response.statusCode}`, 35);
      helper.log(`Headers: ${JSON.stringify(response.headers)}`, 35);
    } else {
      helper.log("But got no response, maybe offline or an error on the School-Server?", 31);
    }

    const parsedBody = JSON.parse(body);

    if (parsedBody) {
      res.json(parsedBody);
    } else {
      res.status(200).json({ error: "NO_BODY_RECIEVED_FROM_SCHOOL_SERVER" });
    }
  });
};

module.exports = getMenu;
