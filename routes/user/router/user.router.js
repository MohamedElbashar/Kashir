const express = require("express");
const auth = require("../../../middleware/auth");
const authPermission = require("../../../middleware/authPermission");
const returnResponse = require("../../../utils/returnResponse");
const router = express.Router();
const userService = require("../services");
const { UserValidationSchema } = require("../validation/UserValidationSchema");

router.post(
  "/",
  [UserValidationSchema, authPermission("add_user")],
  async (req, res) => {
    const user = req.body;

    try {
      const response = await userService.createUser(user);
      return res.header("x-auth-token", response).send("user created");
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Creating User",
        err,
        res
      );
    }
  }
);

router.get("/me", [auth, authPermission("get_users")], async (req, res) => {
  try {
    const currentUser = await userService.getCurrentUser(req.user._id);
    return returnResponse(200, "Successfully retrieved user", currentUser, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving User",
      err,
      res
    );
  }
});

router.put(
  "/:id",
  [auth, UserValidationSchema, authPermission("edit_user")],
  async (req, res) => {
    const user = req.body;
    try {
      const response = await userService.updateUser(req.params.id, user);
      return returnResponse(200, "Successfully updated user", response, res);
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Updating User",
        err,
        res
      );
    }
  }
);

router.delete(
  "/:id",
  [auth, authPermission("delete_user")],
  async (req, res) => {
    try {
      const response = await userService.deleteUser(req.params.id);
      return returnResponse(200, "Successfully deleted user", response, res);
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Deleting User",
        err,
        res
      );
    }
  }
);

router.get("/", [authPermission("get_users")], async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return returnResponse(
      200,
      "Successfully retrieved all users",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving All Users",
      err,
      res
    );
  }
});
module.exports = router;
