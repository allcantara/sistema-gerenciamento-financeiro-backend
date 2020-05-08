const { celebrate, Segments, Joi } = require("celebrate");

module.exports = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    isTaxes: Joi.boolean().required(),
    user_id: Joi.string().required(),
    sale_id: Joi.string().required(),
  }),
});
