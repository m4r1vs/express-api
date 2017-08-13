// Config of the wallet API. Token and Email User specific.
require('dotenv').config();

module.exports = {
  general: {
    token: process.env.API_AUTH_TOKEN
  },
  walletCredentials: {
    token: process.env.WALLET_AUTH_TOKEN,
    mail: process.env.WALLET_AUTH_MAIL
  },
  tipeeeStream: {
    token: process.env.TIPEE_AUTH_TOKEN
  }
};
