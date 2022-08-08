const { Role } = require("../../../models/roles.model");
const { Permission } = require("../../../models/permission.model");
const { RolePermission } = require("../../../models/rolePermission.model");
const makeRoleService = require("./role.service");
const roleService = makeRoleService(Role, Permission, RolePermission);

module.exports = roleService;
