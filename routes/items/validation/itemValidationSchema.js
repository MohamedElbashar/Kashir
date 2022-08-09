const { celebrate, Segments, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

const itemValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    collectionId: Joi.objectId().required(),
  }),
});
exports.itemValidationSchema = itemValidationSchema;
