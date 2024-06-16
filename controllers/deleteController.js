const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

exports.delete_item_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();

  if (item === null) {
    res.redirect("/home");
  }

  res.render("deleteItem", {
    item: item,
  });
});

exports.delete_item_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  await Item.findByIdAndDelete(req.body.itemID);
  res.redirect("/home");
});

exports.delete_category_get = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    res.redirect("/home");
  }

  res.render("deleteCategory", {
    category: category,
    items: itemsInCategory,
  });
});

exports.delete_category_post = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  await Category.findByIdAndDelete(req.body.categoryID);
  res.redirect("/home");
});
