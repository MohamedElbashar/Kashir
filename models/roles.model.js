const mongoose = require("mongoose");
const Schema = require("mongoose");
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissionIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);
exports.Role = Role;
exports.roleSchema = roleSchema;
