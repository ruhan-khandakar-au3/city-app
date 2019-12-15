const mongoose = require("mongoose");

const StatesSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, "Please add a state name."]
  },
  cities: {
    type: [String]
  }
});

module.exports = mongoose.model("States", StatesSchema);
