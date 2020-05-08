const { celebrate, Segments, Joi } = require("celebrate");

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
