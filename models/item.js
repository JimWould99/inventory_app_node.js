const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock_no: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return "/main/item/" + this._id;
});

//export model
module.exports = mongoose.model("Item", ItemSchema);
