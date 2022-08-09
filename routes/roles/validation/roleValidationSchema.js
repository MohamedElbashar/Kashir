const { celebrate, Segments, Joi } = require("celebrate");

const roleValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().valid("REGULAR", "MANAGER", "GLOBAL_MANAGER").required(),
  }),
});
exports.roleValidationSchema = roleValidationSchema;
