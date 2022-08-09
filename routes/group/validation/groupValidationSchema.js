const { celebrate, Segments, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
const groupValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    collectionId: Joi.array().items(Joi.objectId()).required(),
  }),
});
exports.groupValidationSchema = groupValidationSchema;
