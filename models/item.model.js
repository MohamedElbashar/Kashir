const mongoose = require("mongoose");
const Schema = mongoose;
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
exports.Item = Item;
