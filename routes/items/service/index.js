const { Item } = require("../schema/item.model");
const { Collection } = require("../../collection/schema/collection.model");

const makeItemService = require("./item.service");
const itemService = makeItemService(Item, Collection);
module.exports = itemService;
