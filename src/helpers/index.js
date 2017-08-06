const consoleLog = require('./consoleLog.js');

/*
* The different GLOBAL helpers.
* This needs to be required via var helper = require('PATH/helpers').
* Every here listed function can then be used with helper.function().
*/

const helper = {
  log: consoleLog // Colorful ConsoleLog with arrow
};

module.exports = helper;
