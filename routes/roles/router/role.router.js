const express = require("express");
const roleService = require("../services");
const router = express.Router();

const auth = require("../../../middleware/auth");
const authPermission = require("../../../middleware/authPermission");
const returnResponse = require("../../../utils/returnResponse");
const { roleValidationSchema } = require("../validation/roleValidationSchema");

router.use(auth);

// @route POST api/roles/permission/:id
// to add permission to role
router.post(
  "/permission/:id",
  authPermission("GLOBAL_MANAGER"),
  async (req, res) => {
    const roleId = req.params.id;
    const permissions = req.body;
    try {
      const role = await roleService.addPermissionToRole(roleId, permissions);
      return returnResponse(res, 200, "Success", role);
    } catch (err) {
      return returnResponse(res, 500, "Error", err);
    }
  }
);

router.post(
  "/",
  [roleValidationSchema, authPermission("add_role")],
  async (req, res) => {
    const role = req.body;
    try {
      const response = await roleService.createRole(role);
      return returnResponse(200, "Successfully created role", response, res);
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Creating Role",
        err,
        res
      );
    }
  }
);
router.get("/", authPermission("view_roles"), async (req, res) => {
  try {
    const response = await roleService.getAllRoles();
    return returnResponse(200, "Successfully retrieved roles", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Roles",
      err,
      res
    );
  }
});
router.get("/:id", authPermission("view_roles"), async (req, res) => {
  try {
    const response = await roleService.getRole(req.params.id);
    return returnResponse(200, "Successfully retrieved role", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Role",
      err,
      res
    );
  }
});
router.put(
  "/:id",
  [roleValidationSchema, authPermission("edit_role")],
  async (req, res) => {
    const role = req.body;
    try {
      const response = await roleService.updateRole(req.params.id, role);
      return returnResponse(200, "Successfully updated role", response, res);
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Updating Role",
        err,
        res
      );
    }
  }
);
router.delete("/:id", authPermission("delete_role"), async (req, res) => {
  try {
    const response = await roleService.deleteRole(req.params.id);
    return returnResponse(200, "Successfully deleted role", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Deleting Role",
      err,
      res
    );
  }
});
module.exports = router;
