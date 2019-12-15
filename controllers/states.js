/* eslint-disable no-unused-vars */
const States = require("../models/States");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncMiddleware");

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

exports.addCity = asyncHandler(async (req, res, next) => {
  const { stateName, cityName } = req.params;
  if (!stateName || !cityName) {
    return next(
      new ErrorResponse(`Please provide state name and city name`, 400)
    );
  }
  //   Check if state exists or not
  let state = await States.findOne({ state: stateName.toLowerCase() });
  if (!state) {
    return next(
      new ErrorResponse(`State isn't available in our beloved India :p`, 401)
    );
  }

  state.cities.push(cityName);
  state = await state.save();

  return res.status(201).json({
    success: true,
    data: state
  });
});

/* 
@desc       Remove a city from a state
@route      POST /state/:stateName/remove/:cityName
@access     Public
*/

exports.removeCity = asyncHandler(async (req, res, next) => {
  const { stateName, cityName } = req.params;
  if (!stateName || !cityName) {
    return next(
      new ErrorResponse(`Please provide state name and city name`, 400)
    );
  }
  //   Check if state exists or not
  let state = await States.findOne({ state: stateName.toLowerCase() });
  if (!state) {
    return next(
      new ErrorResponse(`State isn't available in our beloved India :p`, 401)
    );
  }

  state.cities.remove(cityName);
  state = await state.save();

  return res.status(201).json({
    success: true,
    data: state
  });
});