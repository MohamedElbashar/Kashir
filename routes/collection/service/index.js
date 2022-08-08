const { Collection } = require("../schema/collection.model");

const makeCollectionService = require("./collection.service");

const collectionService = makeCollectionService(Collection);

module.exports = collectionService;
