const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, stock_no) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    stock_no: stock_no,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("adding categories");
  await Promise.all([
    categoryCreate(0, "shoes", "fun range of shoes"),
    categoryCreate(1, "shirts", "shirts for men and women"),
    categoryCreate(2, "pants", "pants for men and women"),
    categoryCreate(3, "skirts", "skirts in all colours"),
    categoryCreate(4, "hats", "many types of hats on offer"),
    categoryCreate(5, "gloves", "very comfortable gloves"),
  ]);
}

async function createItems() {
  console.log("adding items");
  await Promise.all([
    itemCreate(0, "nike runners", "good quality", categories[0], 5, 140),
    itemCreate(1, "party heels", "5inch tall", categories[0], 10, 200),
    itemCreate(
      2,
      "size X shirt",
      "red and second hand",
      categories[1],
      20,
      100
    ),
    itemCreate(
      3,
      "small shirt",
      "blue and second hand",
      categories[1],
      30,
      100
    ),
    itemCreate(3, "medium shirt", "orange and new", categories[1], 19, 300),
  ]);
}
