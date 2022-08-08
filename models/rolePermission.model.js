const Schema = require("mongoose");
const { createUser } = require("../routes/user/services");

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
// module.exports = RolePermission;

// Admin:{
//     Permissions:{
//         createUser,
//         updateUser,
//         deleteUser,
//         createitem,
//         updateitem,
//     }
// }
// ==>AuthPermission==>roleId,permission

// const AuthPermission=(roleId,permission)=>{
//     const roleId = await Role.findById(roleId);
//     if(!roleId) throw error;
//     const Permission = await Permission.findOne({"name":permission});
//     if(!Permission) throw error;
//     const rolePermission = await RolePermission.findOne({"roleId":roleId,"permissionId":Permission._id});
//     if(!rolePermission) throw error;

//  }
