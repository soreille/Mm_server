const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const serverless = require('serverless-http');

// Connecting MongoDB
const url = 'mongodb+srv://soreille:HL6&j5K9i9K4E.A@cluster0.dvs2zvu.mongodb.net/';
async function mongoDbConnection() {
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      6000
    );
  }
  mongoDbConnection().then(() => {
     console.log("MongoDB successfully connected.");
  }),
    (err) => {
      console.log("Could not connected to database : " + err);
    };

const routes = require("../routes/routes");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);

// CORS
app.use(cors());
// RESTful API root
app.use("/api", routes);
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("PORT Connected on: " + port);
});
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

