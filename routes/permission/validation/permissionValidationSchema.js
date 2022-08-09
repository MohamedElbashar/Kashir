const { celebrate, Segments, Joi } = require("celebrate");

const permissionValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
  }),
});
exports.permissionValidationSchema = permissionValidationSchema;
