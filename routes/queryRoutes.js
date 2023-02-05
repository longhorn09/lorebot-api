"use strict";
const express = require("express");
const router = express.Router();
const sqlBuilder = require("../services/sqlBuilder");

router.get("/query/:loreID", async function (req, res, next) {
  try {
    res.json(
      await sqlBuilder.getLoreID(req.params.loreID)
    );
  } catch (err) {
    console.error(`Error while GET Lore`, err.message);
    next(err);
  }
});


module.exports = router;
