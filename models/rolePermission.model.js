const Schema = require("mongoose");

const rolePermissionSchema = new Schema({
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
const RolePermission = Schema.model("RolePermission", rolePermissionSchema);
module.exports = RolePermission;
