const express = require("express");

const router = express.Router();

const {
  addCity,
  removeCity,
  getCities,
  getState
} = require("../controllers/states");

router.route("/state/:stateName/add/:cityName").post(addCity);
router.route("/state/:stateName/remove/:cityName").delete(removeCity);

router.route("/show-all-cities/:alphabet").get(getCities);
router.route("/state/:cityName").get(getState);

module.exports = router;
