"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Gets a list of states by country code
 * 
 * @param {string} countryCode - The 2 or 3 letter country code
 */
var getCountry = function getCountry(countryCode) {
  var required = require("./".concat(countryCode.toUpperCase(), ".json"));

  return typeof required === 'string' ? JSON.parse(required) : required;
};
/**
 * Gets a list of countries with state data
 * 
 * @param {string[]} filter - An array of country codes (2 letter preferred, falls back to 3 letter)
 */


var getCountries = function getCountries(filter) {
  var list = filter ? filter : require('./countries.json').map(function (item) {
    return item.code;
  }).filter(function (item) {
    return item.length;
  }).sort();
  return list.map(function (item) {
    return _objectSpread({}, getCountry(item), {
      code: item.toUpperCase()
    });
  });
};

module.exports = {
  getCountry: getCountry,
  getCountries: getCountries
};