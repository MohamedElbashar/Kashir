module.exports = (collectionModel) => {
  //create a new collection
  const createCollection = async (collection) => {
    let currentCollection = await collectionModel.findOne({
      name: collection.name,
    });
    if (currentCollection) throw new Error();

    currentCollection = new collectionModel(collection);

    await currentCollection.save();
    return currentCollection;
  };
  //get all collections
  const getAllCollections = async () => {
    const allCollections = await collectionModel.find({}).sort("name");
    return allCollections;
  };
  //get a collection
  const getCollection = async (collectionId) => {
    const currentCollection = await collectionModel.findById(collectionId);
    return currentCollection;
  };
  //update a collection
  const updateCollection = async (collectionId, collection) => {
    const currentCollection = await collectionModel.findByIdAndUpdate(
      collectionId,
      collection,
      { new: true }
    );
    if (!currentCollection) throw new Error();
    return currentCollection;
  };
  //delete a collection
  const deleteCollection = async (collectionId) => {
    const currentCollection = await collectionModel.findByIdAndRemove(
      collectionId
    );
    if (!currentCollection) throw new Error();
    return currentCollection;
  };
  return {
    createCollection,
    getAllCollections,
    getCollection,
    updateCollection,
    deleteCollection,
  };
};
