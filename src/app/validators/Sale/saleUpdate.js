const { celebrate, Segments, Joi } = require("celebrate");

module.exports = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    user_id: Joi.string().required(),
    distributor: Joi.string().required(),
    valueUnitary: Joi.string().required(),
    amount: Joi.number().required(),
    taxeSale: Joi.string().required(),
    date: Joi.date().required(),
    isTaxes: Joi.boolean().required(),
  }),
});
