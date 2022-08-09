const { Collection } = require("../../../models/collection.model");

const makeCollectionService = require("./collection.service");

const collectionService = makeCollectionService(Collection);

module.exports = collectionService;
