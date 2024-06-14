const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  stock_no: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return "/home/item/" + this._id;
});

//export model
module.exports = mongoose.model("Item", ItemSchema);
