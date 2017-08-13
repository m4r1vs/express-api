const getDonations = require('./controller/getDonations.js');

/*
* Collection of the different functions of the teamspeak api.
* They are called by the router:
*/

const teamspeakApi = {
  getDonations
};

module.exports = teamspeakApi;
