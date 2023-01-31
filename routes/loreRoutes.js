const express = require("express");
const router = express.Router();
const sqlBuilder = require("../services/sqlBuilder");

/* GET programming languages. */
/*
router.get("/stat", async function (req, res, next) {
  try {
    res.json(await sqlBuilder.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
*/
router.get("/stat/:loreItem", async function (req, res, next) {
  try {
    //console.log(req.params.loreItem);
    res.json(await sqlBuilder.getMultiple(req.params.loreItem,1));
  } catch (err) {
    console.error(`Error while GET Lore`, err.message);
    next(err);
  }
});

router.get("/stat/:loreItem/:pageNo([0-9]+)", async function (req, res, next) {
  try {
    //console.log(req.params.loreItem + ": " + req.params.pageNo);
    res.json(await sqlBuilder.getMultiple(req.params.loreItem,req.params.pageNo));
  } catch (err) {
    console.error(`Error while GET lore `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post("/stat/:id", async function (req, res, next) {
  try {
    res.json(await sqlBuilder.create(req.body));
  } catch (err) {
    console.error(`Error while CREATE lore`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put("/stat/:id", async function (req, res, next) {
  try {
    res.json(await sqlBuilder.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while UPDATE Lore`, err.message);
    next(err);
  }
});

/* DELETE programming language */
/*
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await sqlBuilder.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});*/

module.exports = router;
