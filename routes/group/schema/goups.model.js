const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collectionId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
      unique: true,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

exports.Group = Group;
exports.groupSchema = groupSchema;
