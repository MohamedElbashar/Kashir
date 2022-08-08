const Permission = require("../models/permission.model");
const RolePermission = require("../models/rolePermission.model");


module.exports = (permission) => (req, res, next) => {
  const { user } = req;

  if (!user) return res.status(401).send("Access denied. No token provided.");

  const rolePerm = await RolePermission.find({ roleId: user.roleId });
  if (!rolePerm) return res.status(400).send("Invalid token.");

  const perm =await Permission.find({ name: permission });

  if (!perm) return res.status(400).send("Invalid token.");

  for (let i = 0; i < rolePerm.length; i++) {
    if (rolePerm[i].permissionId === perm._id) {
      next();
      return;
    }
  }
  return res.status(403).send("Forbidden");
};
