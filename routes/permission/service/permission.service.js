module.exports = (PermissionModel) => {
  //create a new permission
  const createPermission = async (permission) => {
    const newPermission = new PermissionModel(permission);
    await newPermission.save();
    return newPermission;
  };
  //get the permissions
  const getAllPermissions = async () => {
    const allPermissions = await PermissionModel.find({}).sort("name");
    return allPermissions;
  };
  //get the permission by id
  const getPermissionById = async (permissionId) => {
    const currentPermission = await PermissionModel.findById(permissionId);
    return currentPermission;
  };
  //update the permission

  const updatePermission = async (permissionId, permission) => {
    if (!permissionId) throw new Error();
    const currentPermission = await PermissionModel.findByIdAndUpdate(
      permissionId,
      permission,
      {
        new: true,
      }
    );
    if (!currentPermission) throw new Error();
    return currentPermission;
  };
  //delete the permission
  const deletePermission = async (permissionId) => {
    const currentPermission = await PermissionModel.findByIdAndRemove(
      permissionId
    );
    if (!currentPermission) throw new Error();
    return currentPermission;
  };
  return {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
  };
};
