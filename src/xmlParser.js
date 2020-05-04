const xml2js = require('xml2js');
const parser = new xml2js.Parser({ trim: true });

module.exports = {
  parseXmlToJson: parser.parseStringPromise,
};