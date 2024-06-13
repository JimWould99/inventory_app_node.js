const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

/* pre example
exports.index = asyncHandler(async (req, res, next) => {
  res.send("Not yet implemented");
}); */

exports.index = asyncHandler(async (req, res, next) => {
  res.send("Not yet implemented");
});

exports.category = asyncHandler(async (req, res, next) => {
  res.send("Not yet implemented");
});

exports.item = asyncHandler(async (req, res, next) => {
  res.send("Not yet implemented");
});
