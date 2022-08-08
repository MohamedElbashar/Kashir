module.exports = (UserModel, hashUtil, RoleModel, ROLES) => {
  //create a new user
  const createUser = async (user) => {
    let currentUser = await UserModel.findOne({ email: user.email });
    if (currentUser) throw new Error();

    if (user.groupId) {
      const role = await RoleModel.findById(user.roleId);
      if (role !== ROLES.MANAGER) throw new Error();
    }

    currentUser = new UserModel(user);

    const salt = await hashUtil.genSalt(10);
    currentUser.password = await hashUtil.hash(currentUser.password, salt);

    await currentUser.save();

    const token = currentUser.generateAuthToken();
    return token;
  };
  //get the current user
  const getCurrentUser = async (userId) => {
    const currentUser = await UserModel.findById(userId).select("-password");
    return currentUser;
  };
  //delete the current user
  const deleteUser = async (userId, user) => {
    const currentUser = await userModel.findByIdAndRemove(userId);
    if (!currentUser) throw new Error();

    return currentUser;
  };
  //update the current user
  const updateUser = async (userId) => {
    const currentUser = await UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!currentUser) throw new Error();
    return currentUser;
  };
  //get all users
  const getAllUsers = async () => {
    const allUsers = await UserModel.find({}).sort("email");
    return allUsers;
  };
  return {
    createUser,
    getCurrentUser,
    deleteUser,
    updateUser,
    getAllUsers,
  };
};
