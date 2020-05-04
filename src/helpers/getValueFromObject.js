const { get } = require('lodash');

module.exports = (obj, path, defaultValue = '') => get(obj, path, defaultValue);