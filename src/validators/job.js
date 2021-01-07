const Joi = require('@hapi/joi');

module.exports = {
  /*
   *
   * Validate create scheduling
   *
   */
  create: Joi.object({
    email: Joi.array().items(
      Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
    ),
    time: Joi.date().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
  }),
  /*
   *
   * Validate update scheduling
   *
   */
  update: Joi.object({
    email: Joi.array().items(
      Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
    ),
    time: Joi.date(),
    subject: Joi.string(),
    body: Joi.string(),
    _id: Joi.string().required(),
  }),
};
