module.exports = (collectionModel, groupModel) => {
  //create a new group
  const createGroup = async (group) => {
    //check if collections exist or not
    const collections = await collectionModel.count({
      _id: { $in: group.collectionId },
    });
    if (collections !== group.collectionId.length) throw new Error();

    //A collection can belong to a single group
    const currentGroup = await groupModel.find({
      collectionId: { $in: group.collectionId },
    });
    if (currentGroup.length) throw new Error();

    const newGroup = new groupModel(group);
    await newGroup.save();
    return newGroup;
  };

  //get all groups
  const getAllGroups = async () => {
    const allGroups = await groupModel
      .find({})
      .populate("collectionId")
      .sort("name");
    return allGroups;
  };

  //get a group
  const getGroup = async (groupId) => {
    const currentGroup = await groupModel
      .findById(groupId)
      .populate("collectionId");
    return currentGroup;
  };

  //update a group
  const updateGroup = async (groupId, group) => {
    const currentGroup = await groupModel.findByIdAndUpdate(groupId, group, {
      new: true,
    });
    if (!currentGroup) throw new Error();
    return currentGroup;
  };

  //delete a group
  const deleteGroup = async (groupId) => {
    const currentGroup = await groupModel.findByIdAndRemove(groupId);
    if (!currentGroup) throw new Error();
    return currentGroup;
  };
  return {
    createGroup,
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup,
  };
};
