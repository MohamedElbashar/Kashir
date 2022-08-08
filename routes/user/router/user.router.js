const { celebrate, Segments, Joi } = require("celebrate");
const express = require("express");
const auth = require("../../../middleware/auth");
const returnResponse = require("../../../utils/returnResponse");
const router = express.Router();
const userService = require("../services");

const UserValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
  }),
});

router.post("/", UserValidationSchema, async (req, res) => {
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
});

router.get("/me", auth, async (req, res) => {
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

router.put("/:id", [auth, UserValidationSchema], async (req, res) => {
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
});

router.delete("/:id", auth, async (req, res) => {
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
});

router.get("/", async (req, res) => {
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
