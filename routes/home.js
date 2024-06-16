var express = require("express");
var router = express.Router();

const display_controller = require("../controllers/displayController");
const createController = require("../controllers/createController");
const deleteController = require("../controllers/deleteController");
const updateController = require("../controllers/updateController");

//create genre and item

router.get("/item/create", createController.create_item_get);

router.post("/item/create", createController.create_item_post);

router.get("/category/create", createController.create_category_get);

router.post("/category/create", createController.create_category_post);

// update genre and item

router.get("/item/:id/update", updateController.item_update_get);

router.post("/item/:id/update", updateController.item_update_post);

router.get("/category/:id/update", updateController.category_update_get);

router.post("/category/:id/update", updateController.category_update_post);
// delete genre and item

router.get("/item/:id/delete", deleteController.delete_item_get);

router.post("/item/:id/delete", deleteController.delete_item_post);

router.get("/category/:id/delete", deleteController.delete_category_get);

router.post("/category/:id/delete", deleteController.delete_category_post);

// general routes and read
router.get("/", display_controller.index);

router.get("/category/:id", display_controller.category);

router.get("/item/:id", display_controller.item);

module.exports = router;
