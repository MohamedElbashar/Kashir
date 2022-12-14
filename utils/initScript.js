const { User } = require("../models/users.model");
const { Role } = require("../models/roles.model");
const { Permission } = require("../models/permission.model");
const { RolePermission } = require("../models/rolePermission.model");
const rolesObject = require("./rolesObject");
const bcrypt = require("bcrypt");
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
  const currentRolePermission = await RolePermission.count({});
  let promises = [];

  if (currentRolePermission === 0) {
    currentPermissions.forEach(async (permission) => {
      const newRolePermission = new RolePermission({
        roleId: currentRole._id,
        permissionId: permission._id,
      });
      promises.push(newRolePermission.save());
    });
  }

  await Promise.all(promises);

  //check if user exists or not
  const user = await User.findOne({ email: "admin@admin.com" });
  const password = await bcrypt.hash("admin", 10);
  if (!user) {
    const newUser = new User({
      email: "admin@admin.com",
      password,
      roleId: currentRole._id,
    });
    await newUser.save();
  }
};
