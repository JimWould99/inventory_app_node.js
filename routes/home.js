var express = require("express");
var router = express.Router();

const display_controller = require("../controllers/display");

router.get("/", display_controller.index);

router.get("/category:id", function (req, res, next) {
  res.send("not yet implemented");
});

router.get("/item:id", function (req, res, next) {
  res.send("not yet implemented");
});

//create genre and item

router.get("/item/create", function (req, res, next) {
  res.send("not yet implemented");
});

router.post("/item/create", function (req, res, next) {
  res.send("not yet implemented");
});

router.get("/category/create", function (req, res, next) {
  res.send("not yet implemented");
});

router.post("/category/create", function (req, res, next) {
  res.send("not yet implemented");
});

// delete genre and item

router.get("/category/:id/delete", function (req, res, next) {
  res.send("not yet implemented");
});

router.post("/category/:id/delete", function (req, res, next) {
  res.send("not yet implemented");
});

router.get("/item/:id/delete", function (req, res, next) {
  res.send("not yet implemented");
});

router.post("/item/:id/delete", function (req, res, next) {
  res.send("not yet implemented");
});

module.exports = router;
