const express = require("express");
const router = express.Router();
const permissionService = require("../service");

const auth = require("../../../middleware/auth");
const authPermission = require("../../../middleware/authPermission");
const returnResponse = require("../../../utils/returnResponse");
const {
  permissionValidationSchema,
} = require("../validation/permissionValidationSchema");

router.use(auth);
// @route POST api/permission/role/:id
// to add role to permission
router.post(
  "/role/:id",
  authPermission("add_role_to_permission"),
  async (req, res) => {
    const permissionId = req.params.id;
    const roles = req.body;
    try {
      const permission = await permissionService.addRoleToPermission(
        permissionId,
        roles
      );
      return returnResponse(res, 200, "Success", permission);
    } catch (err) {
      return returnResponse(res, 500, "Error", err);
    }
  }
);

// create permission
router.post(
  "/",
  [permissionValidationSchema, authPermission("add_permission")],
  async (req, res) => {
    const permission = req.body;
    try {
      const response = await permissionService.createPermission(permission);
      return returnResponse(
        200,
        "Successfully created permission",
        response,
        res
      );
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Creating Permission",
        err,
        res
      );
    }
  }
);

// get all permissions
router.get("/", authPermission("get_permissions"), async (req, res) => {
  try {
    const response = await permissionService.getAllPermissions();
    return returnResponse(
      200,
      "Successfully retrieved permissions",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Permissions",
      err,
      res
    );
  }
});

// get permission by id
router.get("/:id", authPermission("get_permissions"), async (req, res) => {
  try {
    const response = await permissionService.getPermission(req.params.id);
    return returnResponse(
      200,
      "Successfully retrieved permission",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Permission",
      err,
      res
    );
  }
});

// update permission
router.put(
  "/:id",
  [permissionValidationSchema, authPermission("edit_permission")],
  async (req, res) => {
    const permission = req.body;
    try {
      const response = await permissionService.updatePermission(
        req.params.id,
        permission
      );
      return returnResponse(
        200,
        "Successfully updated permission",
        response,
        res
      );
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Updating Permission",
        err,
        res
      );
    }
  }
);

// delete permission
router.delete("/:id", authPermission("delete_permission"), async (req, res) => {
  try {
    const response = await permissionService.deletePermission(req.params.id);
    return returnResponse(
      200,
      "Successfully deleted permission",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Deleting Permission",
      err,
      res
    );
  }
});
module.exports = router;
