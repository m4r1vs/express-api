const request = require('request');
const helper = require('../../helpers');
const config = require('../config.js');

const getCategoryId = (query) => {
  /*
  * This functions compares the input (query) with the array of keywords
  * and if it finds a match it returns the ID of the category.
  * The fallback category is "other".
  */

  let categoryID = "ac9e7fb2-7ee8-45a0-893c-52d91b57b977";
  const keywordList = [
    ["55d753ba-6d08-4787-9c31-57d84c61a566", "wellness", "beauty", "massage"],
    ["612452ee-e462-433d-818e-49a78196e9e0", "software", "apps", "games", "steam", "computergames"],
    ["7279124d-b07c-4c84-8dec-3224b9ac759a", "fitness", "sports", "sport", "gym"],
    ["81d46bb7-2e27-44a2-8259-974c5879392a", "restaurant", "fastfood", "pizza", "burgers", "burger"],
    ["92c75849-6caf-414d-90ec-84f8d3983150", "bar", "coffee", "cafe", "drinks"],
    ["931e6e73-101d-4daa-8dfc-c538c2f10de5", "shopping", "stuff"],
    ["db587ab5-adb7-4bc8-afe1-841960abe7eb", "electronics"],
    ["e47dd3ef-599a-45a5-a344-c09c467671d4", "drugstore", "drugs"],
    ["e9856963-7a34-4548-81b0-6cc6cba14828", "groceries", "food", "foods", "grocery"],
    ["ac9e7fb2-7ee8-45a0-893c-52d91b57b977", "other", "otherstuff"]
  ];

  keywordList.forEach((array) => {
    if (array.includes(query)) {
      categoryID = array[0];
    }
  });

  helper.log(
    `Record will be added to category with ID '${categoryID}'. Query was ${query}.`, 36
  );

  return categoryID;
};

const addRecord = (req, res) => {
  /*
  * This function is called by the router when /wallet/add-record/ is
  * requested. It gets two values via query and a token in the body of
  * the request.
  */

  helper.log(`Request to access ${req.url}`, 36);

  if (isNaN(req.query.amount)) { // Check if amount is a number
    helper.log(`Amount in query in \x1b[4m${__filename}\x1b[0m\x1b[31m is not a number`, 31);
    res.json('{"stat": "Amount in query is not a number. Cant add record."}');
  } else {
    let categoryQuery = "other";

    if (req.query.category) {
      categoryQuery = req.query.category // category from requests URL
        .replace(/\s/g, '') // Remove all white spaces
        .toLowerCase(); // Make String to lowercase
    } else {
      helper.log("No category found in URL. Using 'other'..", 33);
    }

    const bodySend = [{ // Wallet API needs these values
      categoryId: getCategoryId(categoryQuery), // transformed category
      accountId: "dae7663b-42e9-4ac5-95cd-d32e8802a84b", // It's cash
      currencyId: "1fb57c46-e162-4db3-8c31-53c602505e80", // €€€
      amount: req.query.amount, // How much?
      paymentType: "cash", // self explaining
      note: "Created with Google Assistant", // Note that it's the API
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

module.exports = addRecord;
