const { User } = require("../schema/users.model");
const { Role } = require("../../../models/roles.model");
const bcrypt = require("bcrypt");
const ROLES = require("../../../utils/constants");
const makeUserService = require("./user.service");

const userService = makeUserService(User, bcrypt, Role, ROLES);

module.exports = userService;
