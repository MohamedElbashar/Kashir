const mongoose = require("mongoose");
const Schema = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
exports.Role = Role;
exports.roleSchema = roleSchema;
