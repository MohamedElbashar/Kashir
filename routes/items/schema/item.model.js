const mongoose = require("mongoose");
const {
  collectionSchema,
} = require("../../collection/schema/collection.model");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
});
const Item = mongoose.model("Item", itemSchema);
exports.Item = Item;
