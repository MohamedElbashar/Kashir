const express = require("express");
const router = express.Router();
const permissionService = require("../service");
const { celebrate, Segments, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
const auth = require("../../../middleware/auth");
const authPermission = require("../../../middleware/authPermission");
const returnResponse = require("../../../utils/returnResponse");

const permissionValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
  }),
});

// @route POST api/permission/role/:id
// to add role to permission

router.post(
  "/role/:id",
  auth,
  authPermission(["GLOBAL_MANAGER"]),
  permissionValidationSchema,
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

router.post(
  "/",
  [permissionValidationSchema, auth, authPermission("add_permission")],
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
router.get(
  "/",
  [auth, authPermission("view_permissions")],
  async (req, res) => {
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
  }
);
router.get(
  "/:id",
  [auth, authPermission("view_permissions")],
  async (req, res) => {
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
  }
);
router.put(
  "/:id",
  [permissionValidationSchema, auth, authPermission("edit_permission")],
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
router.delete(
  "/:id",
  [auth, authPermission("delete_permission")],
  async (req, res) => {
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
  }
);
module.exports = router;
