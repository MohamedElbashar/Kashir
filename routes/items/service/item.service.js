module.exports = (ItemModel, CollectionModel) => {
  //create new Item
  const createItem = async (item) => {
    const collection = await CollectionModel.findById(item.collectionId);
    if (!collection) throw new Error();
    const newItem = new ItemModel(item);
    await newItem.save();
    return newItem;
  };
  //get all Items
  const getAllItems = async () => {
    const allItems = await ItemModel.find({}).populate("collectionId");
    return allItems;
  };
  //get a Item
  const getItem = async (itemId) => {
    const currentItem = await ItemModel.findById(itemId).populate(
      "collectionId"
    );
    return currentItem;
  };
  //update a Item
  const updateItem = async (itemId, item) => {
    const currentItem = await ItemModel.findByIdAndUpdate(itemId, item, {
      new: true,
    });
    if (!currentItem) throw new Error();
    return currentItem;
  };
  //delete a Item
  const deleteItem = async (itemId) => {
    const currentItem = await ItemModel.findByIdAndRemove(itemId);
    if (!currentItem) throw new Error();
    return currentItem;
  };

  return {
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem,
  };
};
