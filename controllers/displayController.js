const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

/* pre example
exports.index = asyncHandler(async (req, res, next) => {
  res.send("Not yet implemented");
}); */

exports.index = asyncHandler(async (req, res, next) => {
  const allGenres = await Category.find({}).exec();
  const [numGenres, numItems] = await Promise.all([
    Category.countDocuments({}).exec(),
    Item.countDocuments({}).exec(),
  ]);
  res.render("index", {
    genres: allGenres,
    numGenres: numGenres,
    numItems: numItems,
  });
});

exports.category = asyncHandler(async (req, res, next) => {
  const [oneCategory, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  /*
  const oneCategory = await Category.findById(req.params.id).exec();
  const itemsInCategory = await Item.find({
    category: oneCategory.name,
  }).exec(); */
  if (oneCategory === null) {
    // No results.
    const err = new Error("category not found");
    err.status = 404;
    return next(err);
  }
  res.render("category", { cat: oneCategory, items: itemsInCategory });
});

exports.item = asyncHandler(async (req, res, next) => {
  const oneItem = await Item.findById(req.params.id)
    .populate("category")
    .exec();
  if (oneItem === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  res.render("item", { item: oneItem });
});
