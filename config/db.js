const mongoose = require("mongoose");

const { url } = require("./index");

const connectDB = async () => {
  const conn = await mongoose.connect(url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
  console.log(
    `Database connection: ${conn.connection.host}`.cyan.underline.bold
  );
};
module.exports = connectDB;
