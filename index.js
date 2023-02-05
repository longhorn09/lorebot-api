"use strict";
require('dotenv').config()
const express = require("express");
const app = express();
const port = 8080;
const statRouter = require("./routes/loreRoutes");
const briefRouter = require("./routes/briefRoutes");
const API_VERSION = "/api/v1/"

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
/**
 * https://www.geeksforgeeks.org/how-to-create-multiple-routes-in-the-same-express-js-server/
 */
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use(API_VERSION, statRouter); // api/v1/stat
app.use(API_VERSION , briefRouter); // api/v1/brief 
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

/**
 * reference: https://blog.logrocket.com/build-rest-api-node-express-mysql/
 */
app.listen(port, () => {
  console.log(`Lorebot listening on http://localhost:${port}`);
});
