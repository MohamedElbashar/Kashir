const { Permission } = require("../../../models/permission.model");

const makePermissionService = require("./permission.service");
const permissionService = makePermissionService(Permission);
module.exports = permissionService;
