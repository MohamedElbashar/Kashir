const { Group } = require("../../../models/goups.model");
const { Collection } = require("../../../models/collection.model");

const makeGroupService = require("./group.service");
const groupService = makeGroupService(Collection, Group);

module.exports = groupService;
