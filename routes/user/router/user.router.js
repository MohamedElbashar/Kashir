const { celebrate, Segments, Joi } = require("celebrate");
const express = require("express");
const auth = require("../../../middleware/auth");
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
    return res.status(400).send(err);
  }
});

router.get("/me", auth, async (req, res) => {
  const currentUser = await userService.getCurrentUser(req.user._id);
  res.status(200).send(currentUser);
});

router.put("/:id", [auth, UserValidationSchema], async (req, res) => {
  const user = req.body;
  try {
    const response = await userService.updateUser(req.params.id, user);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await userService.deleteUser(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
module.exports = router;
