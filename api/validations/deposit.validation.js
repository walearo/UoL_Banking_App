const Joi = require('joi')

const depositValidation = (data) => {
  const schema = Joi.object({
    accountno: Joi.string().regex(/^[0-9]{8}$/)
    .messages({'string.pattern.base': `Account number must have 8 digits.`})
    .required(),
    amount: Joi.number()
    .options({ convert: false })
    .positive()
    .required()
    .messages({
      'number.positive': 'amount: {{amount}}, must be a positive number'
    })
  })
  return schema.validate(data);
}

module.exports = { depositValidation }