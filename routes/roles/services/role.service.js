module.exports = (RoleModel) => {
  //create a new role
  const createRole = async (role) => {
    const newRole = new RoleModel(role);
    await newRole.save();
    return newRole;
  };
  //get the roles
  const getAllRoles = async () => {
    const allRoles = await RoleModel.find({}).sort("name");
    return allRoles;
  };

  //get the role by id
  const getRoleById = async (roleId) => {
    const currentRole = await RoleModel.findById(roleId);
    return currentRole;
  };

  //update the role
  const updateRole = async (roleId, role) => {
    if (!roleId) throw new Error();
    const currentRole = await RoleModel.findByIdAndUpdate(roleId, role, {
      new: true,
    });
    if (!currentRole) throw new Error();
    return currentRole;
  };

  //delete the role
  const deleteRole = async (roleId) => {
    const currentRole = await RoleModel.findByIdAndRemove(roleId);
    if (!currentRole) throw new Error();
    return currentRole;
  };

  //Add permission To Role
  //   const addPermissionToRole = async (roleId, permissionId) => {
  //     const currentRole = await RoleModel.findById(roleId);
  //     if (!currentRole) throw new Error();
  //     currentRole.permissions.push(permissionId);
  //     await currentRole.save();
  //     return currentRole;
  //   };
  return {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
  };
};
