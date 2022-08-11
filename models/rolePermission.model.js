const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolePermissionSchema = new mongoose.Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  },
});
const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

exports.RolePermission = RolePermission;
