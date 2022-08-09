const { celebrate, Segments, Joi } = require("celebrate");

const UserValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
  }),
});
exports.UserValidationSchema = UserValidationSchema;
