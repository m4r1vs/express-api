// Config of the wallet API. Token and Email User specific.
require('dotenv').config();

module.exports = {
  walletCredentials: {
    token: process.env.WALLET_AUTH_TOKEN,
    mail: process.env.WALLET_AUTH_MAIL
  }
};
