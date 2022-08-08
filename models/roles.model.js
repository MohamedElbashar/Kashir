const mongoose = require("mongoose");
const { roles } = require("../utils/constants");
const { groupSchema } = require("./goups.model");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    enum: roles,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);
exports.Role = Role;
exports.roleSchema = roleSchema;
