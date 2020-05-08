const { celebrate, Segments, Joi } = require("celebrate");

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    user_id: Joi.string().required(),
    distributor: Joi.string().required(),
    valueUnitary: Joi.string().required(),
    amount: Joi.number().required(),
    taxeSale: Joi.string().required(),
    date: Joi.date().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
