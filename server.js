/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const path = require("path");

const express = require("express");
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
  // eslint-disable-next-line global-require
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Static middleware

app.get("/findFrequentState", (req, res) => {
  // eslint-disable-next-line no-path-concat
  // eslint-disable-next-line prefer-template
  res.sendFile(path.join(__dirname, "public/frequent-state.html"));
});

// Mount routes
app.use("/", stateRouter);

app.get("*", (req, res) => {
  res.redirect("/");
});

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
