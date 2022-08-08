const { Role } = require("../../../models/roles.model");

const makeRoleService = require("./role.service");
const roleService = makeRoleService(Role);
module.exports = roleService;
