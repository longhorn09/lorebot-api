"use strict";
require('dotenv').config()
const express = require("express");
const app = express();
const port = 8080;
const loreRouter = require("./routes/loreRoutes");
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

app.use(API_VERSION, loreRouter);

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
