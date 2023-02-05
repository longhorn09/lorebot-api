"use strict";
const express = require("express");
const router = express.Router(); //https://stackoverflow.com/questions/45660859/typeerror-cannot-read-property-push-of-undefined-express
const sqlBuilder = require("../services/sqlBuilder");

/* GET programming languages. */
/*
briefRouter.get("/stat", async function (req, res, next) {
  try {
    res.json(await sqlBuilder.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
*/
router.get("/brief/:loreItem", async function (req, res, next) {
  try {
    //console.log(req.params.loreItem);
    res.json(await sqlBuilder.getObjectNames(req.params.loreItem,1));
  } catch (err) {
    console.error(`Error while GET Lore`, err.message);
    next(err);
  }
});

router.get("/brief/:loreItem/:pageNo([0-9]+)", async function (req, res, next) {
  try {
    //console.log(req.params.loreItem + ": " + req.params.pageNo);
    res.json(await sqlBuilder.getObjectNames(req.params.loreItem,req.params.pageNo));
  } catch (err) {
    console.error(`Error while GET lore `, err.message);
    next(err);
  }
});
  
module.exports = router
