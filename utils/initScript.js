const { User } = require("../models/users.model");
const { Role } = require("../models/roles.model");
const { Permission } = require("../models/permission.model");
const { RolePermission } = require("../models/rolePermission.model");
const rolesObject = require("./rolesObject");

module.exports = async () => {
  //check if permission exists or not
  const permissions = await Permission.count({});
  if (permissions === 0) {
    await Permission.insertMany(rolesObject);
  }

  //check if role exists or not
  const role = await Role.findOne({ name: "GLOBAL_MANAGER" });
  if (!role) {
    const newRole = new Role({
      name: "GLOBAL_MANAGER",
    });
    await newRole.save();
  }
  //assign role to permissions
  const currentPermissions = await Permission.find({});
  const currentRole = await Role.findOne({ name: "GLOBAL_MANAGER" });
  for (let i = 0; i < currentPermissions.length; i++) {
    const rolePermission = new RolePermission({
      roleId: currentRole._id,
      permissionId: currentPermissions[i]._id,
    });
    await rolePermission.save();
  }

  //check if user exists or not
  const user = await User.findOne({ email: "admin@admin.com" });
  if (!user) {
    const newUser = new User({
      email: "admin@admin.com",
      password: "admin",
      roleId: currentRole._id,
    });
    await newUser.save();
  }
};
