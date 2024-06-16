const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  if (item === null) {
    const err = new Error("item not found");
    err.status = 404;
    return next(err);
  }

  res.render("createItem", { item: item, categories: allCategories });
});

exports.item_update_post = [
  body("name", "Please fill in name").trim().isLength({ min: 3 }).escape(),
  body("description", "Please fill in name")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category", "Please select category").escape(),
  body("price", "Please give a price").escape(),
  body("price", "Please give a stock number").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock_no: req.body.stock_no,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      res.render("createItem", { item: item, categories: allCategories });
      return;
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updatedItem.url);
    }
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.render("create_category", { category: category });
});

exports.category_update_post = [
  body("name", "Category must be at least 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("create_category", {
        errors: errors.array(),
        category: category,
      });
      //return;
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];
