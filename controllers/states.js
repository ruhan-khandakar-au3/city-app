/* eslint-disable no-unused-vars */
const States = require("../models/States");

/* 
@desc       Get all cities with matching alphabet
@route      POST /show-all-cities/:alphabet
@access     Public
*/

exports.getCities = (req, res, next) => {
  res.send("Here is your all cities");
};

/* 
@desc       Get state name from city name
@route      POST /state/:cityName
@access     Public
*/

exports.getState = (req, res, next) => {
  res.send("Here is your state name");
};

/* 
@desc       Add city to a state
@route      POST /state/:stateName/add/:cityName
@access     Public
*/

exports.addCity = (req, res, next) => {
  res.send("City added");
};

/* 
@desc       Remove a city from a state
@route      POST /state/:stateName/remove/:cityName
@access     Public
*/

exports.removeCity = (req, res, next) => {
  res.send("City removed");
};
