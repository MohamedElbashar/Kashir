const mongoose = require("mongoose");
const ROLES = require("../utils/constants");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ROLES,
  },
});

const Role = mongoose.model("Role", roleSchema);
exports.Role = Role;
exports.roleSchema = roleSchema;
