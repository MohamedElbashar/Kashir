module.exports = (RoleModel, PermissionModel, RolePermissionModel) => {
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
  const addPermissionToRole = async (roleId, permissionIds) => {
    //check the role is exist or not
    const Role = await RoleModel.findById(roleId);
    if (!Role) throw new Error();

    //check the permission is exist or not
    const permissions = await PermissionModel.count({
      _id: { $in: permissionIds },
    });
    if (permissions !== permissionIds) throw new Error();

    //create New Permission Role
    let newPermissionRole;
    permissionIds.foreach((permissionId) => {
      newPermissionRole = newPermissionRole.push({
        roleId,
        permissionId,
      });
    });

    // const newRolePermissions = permissionIds.map((permission) => {
    //   return {
    //     role: roleId,
    //     permission: permission._id,
    //   };
    // });
    const updatedRolePermissions = await RolePermissionModel.insertMany(
      newPermissionRole
    );
    return updatedRolePermissions;
  };
  return {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    addPermissionToRole,
  };
};
