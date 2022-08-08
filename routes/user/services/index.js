const { User } = require("../schema/users.model");
const bcrypt = require("bcrypt");

const makeUserService = require("./user.service");

const userService = makeUserService(User, bcrypt);

module.exports = userService;
