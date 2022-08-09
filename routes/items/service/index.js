const { Item } = require("../../../models/item.model");
const { Collection } = require("../../../models/collection.model");

const makeItemService = require("./item.service");
const itemService = makeItemService(Item, Collection);
module.exports = itemService;
