/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const path = require("path");

const express = require("express");
const morgan = require("morgan");
const colors = require("colors");

const { port } = require("./config");

// Custom module
const errorHandler = require("./middlewares/error");

// Initialize express
const app = express();

// Require db
const connectDB = require("./config/db");

// Routes
const stateRouter = require("./routes/states");

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static middleware
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/", stateRouter);

// Error handler middleware
app.use(errorHandler);

// Connect Database
connectDB();

// Start Server
const PORT = port;
const server = app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhanlded promise error
process.on("unhandledRejection", (err, response) => {
  console.error(`Error:  ${err.message}`.inverse.red);
  // exit process
  server.close(() => process.exit(1));
});
