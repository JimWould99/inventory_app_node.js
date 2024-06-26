const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");

exports.create_item_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("createItem", { categories: allCategories });
});

exports.create_item_post = [
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
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      res.render("createItem", { item: item, categories: allCategories });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.create_category_get = asyncHandler(async (req, res, next) => {
  res.render("create_category", { errors: "undefined" });
});

exports.create_category_post = [
  body("name", "Category must be at least 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("create_category", {
        errors: errors.array(),
        category: category,
      });
      //return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect("/home");
      }
    }
  }),
];
