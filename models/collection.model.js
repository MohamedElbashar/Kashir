const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model("Collection", collectionSchema);

exports.Collection = Collection;
exports.collectionSchema = collectionSchema;
