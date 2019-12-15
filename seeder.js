/* eslint-disable no-unused-vars */

const fs = require("fs");

const mongoose = require("mongoose");
const colors = require("colors");

// Load env
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

const { url } = require("./config");

// Load Models
const States = require("./models/States");

// Read JSON File
const cities = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cities.json`, "utf-8")
);

// Convert json to array of objects
const statesObj = {};

cities.forEach(city => {
  if (statesObj[city.state]) {
    statesObj[city.state].cities.push(city.name);
  } else {
    statesObj[city.state] = {
      state: city.state,
      cities: [city.name]
    };
  }
});

const statesArray = Object.values(statesObj);

// Connect to DB
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Import into DB
const importData = async () => {
  try {
    await States.create(statesArray);

    console.log("Data imported..".green.inverse);
    process.exit(1);
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

// Delete data from db
const deleteData = async () => {
  try {
    await States.deleteMany();

    console.log("Data deleted..".red.inverse);
    process.exit(1);
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

// node Command
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}

// node seeder.js -i => for import datas to database
// node seeder.js -d => for delete datas from database
