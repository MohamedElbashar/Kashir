const { Group } = require("../schema/goups.model");
const { Collection } = require("../../collection/schema/collection.model");

const makeGroupService = require("./group.service");
const groupService = makeGroupService(Collection, Group);

module.exports = groupService;
