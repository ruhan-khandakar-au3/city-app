/* eslint-disable function-paren-newline */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
const States = require("../models/States");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncMiddleware");
const sortThings = require("../utils/sort");
const {
  upperFirstCharacter,
  removeSpace
} = require("../utils/stringManipulation");

/* 
@desc       Get all cities with matching alphabet
@route      GET /show-all-cities/:alphabet
@access     Public
*/

exports.getCities = asyncHandler(async (req, res, next) => {
  const { alphabet } = req.params;
  if (!alphabet) {
    return next(new ErrorResponse(`Please provide a valid alphabet`, 400));
  }

  const regex = new RegExp("^" + alphabet + "", "i");

  let matchedCities = await States.aggregate([
    { $match: { cities: { $elemMatch: { $regex: regex } } } },
    { $unwind: "$cities" },
    { $match: { cities: { $regex: regex } } }
  ]);
  matchedCities = matchedCities.map(item => item.cities);

  matchedCities = matchedCities.sort(sortThings);

  return res.status(200).json({
    success: true,
    count: matchedCities.length,
    data: matchedCities
  });
});

/* 
@desc       Get state name from city name
@route      GET /state/:cityName
@access     Public
*/

exports.getState = asyncHandler(async (req, res, next) => {
  let { cityName } = req.params;

  if (!cityName) {
    return next(new ErrorResponse(`Please provide a city name`, 400));
  }
  cityName = cityName
    .split(" ")
    .map(str => upperFirstCharacter(str))
    .join("-");
  const state = await States.findOne({
    cities: { $in: [`${cityName}`] }
  });
  if (!state) {
    return next(
      new ErrorResponse(`This city doesn't belongs to any state.`, 401)
    );
  }

  //   "west-bengal" --> "West Bengal"
  const foundStateName = state.state
    .split("-")
    .map(str => upperFirstCharacter(str))
    .join(" ");
  return res.status(200).json({
    success: true,
    data: foundStateName
  });
});

/* 
@desc       Add city to a state
@route      POST /state/:stateName/add/:cityName
@access     Public
*/

exports.addCity = asyncHandler(async (req, res, next) => {
  let { stateName, cityName } = req.params;
  if (!stateName || !cityName) {
    return next(
      new ErrorResponse(`Please provide state name and city name`, 400)
    );
  }
  //   Check if state exists or not
  stateName = removeSpace(stateName.toLowerCase());
  let state = await States.findOne({
    state: stateName
  });
  if (!state) {
    return next(
      new ErrorResponse(`State isn't available in our beloved India :p`, 401)
    );
  }
  //   "new coochbehar" --> "New-Coochbehar"
  cityName = cityName
    .split(" ")
    .map(str => upperFirstCharacter(str))
    .join("-");

  state.cities.push(cityName);
  state = await state.save();

  //   "west-bengal" --> "West Bengal"
  state.state = state.state
    .split("-")
    .map(str => upperFirstCharacter(str))
    .join(" ");

  return res.status(201).json({
    success: true,
    data: state
  });
});

/* 
@desc       Remove a city from a state
@route      DELETE /state/:stateName/remove/:cityName
@access     Public
*/

exports.removeCity = asyncHandler(async (req, res, next) => {
  let { stateName, cityName } = req.params;
  if (!stateName || !cityName) {
    return next(
      new ErrorResponse(`Please provide state name and city name`, 400)
    );
  }
  //   Check if state exists or not
  stateName = removeSpace(stateName.toLowerCase());
  let state = await States.findOne({
    state: stateName
  });
  if (!state) {
    return next(
      new ErrorResponse(`State isn't available in our beloved India :p`, 401)
    );
  }

  //   "new coochbehar" --> "New-Coochbehar"
  cityName = cityName
    .split(" ")
    .map(str => upperFirstCharacter(str))
    .join("-");

  state.cities.remove(cityName);
  state = await state.save();

  //   "west-bengal" --> "West Bengal"
  state.state = state.state
    .split("-")
    .map(str => upperFirstCharacter(str))
    .join(" ");

  return res.status(201).json({
    success: true,
    data: state
  });
});
