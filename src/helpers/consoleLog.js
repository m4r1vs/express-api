/*
* This functions needs looks like this:
* helper.log(text [a string], color [a number])
* Information about the colorcodes: https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
*/

// TODO: Log not only to console but also to file (api.log f.e.)

// NOTE: concider using MomentJS:
const consoleLog = (text, color) => {
  const timestamp = new Date();
  const timestampStr = `[${
        timestamp.getHours()}:${
        timestamp.getMinutes()}:${
        timestamp.getSeconds()}]`;
  console.log(`► \x1b[35m${timestampStr} \x1b[%sm%s\x1b[0m`, color, text);
};

module.exports = consoleLog;
