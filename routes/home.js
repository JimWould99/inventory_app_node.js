var express = require("express");
var router = express.Router();

const display_controller = require("../controllers/displayController");
const createController = require("../controllers/createController");
const deleteController = require("../controllers/deleteController");

router.get("/", display_controller.index);

router.get("/category:id", display_controller.category);

router.get("/item:id", display_controller.item);

//create genre and item

router.get("/item/create", createController.create_item_get);

router.post("/item/create", createController.create_item_post);

router.get("/category/create", createController.create_category_get);

router.post("/category/create", createController.create_category_post);

// delete genre and item

router.get("/category/:id/delete", deleteController.delete_item_get);

router.post("/category/:id/delete", deleteController.delete_item_post);

router.get("/item/:id/delete", deleteController.delete_category_get);

router.post("/item/:id/delete", deleteController.delete_category_post);

module.exports = router;
