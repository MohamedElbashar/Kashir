const { celebrate, Segments, Joi } = require("celebrate");

const collectionValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().lowercase(),
  }),
});
exports.collectionValidationSchema = collectionValidationSchema;
