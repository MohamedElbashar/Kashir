const express = require("express");
const router = express.Router();
const { authUser } = require("../services/auth.service");
const { celebrate, Segments, Joi } = require("celebrate");
const UserValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
  }),
});

router.post("/", UserValidationSchema, async (req, res) => {
  const user = req.body;
  try {
    const response = await authUser(user);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send("invalid email or password");
  }
});

module.exports = router;
