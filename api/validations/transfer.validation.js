const Joi = require('joi')

const transferValidation = (data) => {
  const schema = Joi.object({
    senderaccount: Joi.string().regex(/^[0-9]{8}$/)
    .messages({'string.pattern.base': `Sender's Account must be 8 digits.`})
    .required(),
    receiveraccount: Joi.string().regex(/^[0-9]{8}$/)
    .disallow(Joi.ref('senderaccount'))
    .required()
    .messages({
      'string.pattern.base': `Receiver's Account must be 8 digits.`,
      'any.only': `Sender and receiver account cannot be the same.`
    }),
    amount: Joi.number()
    .options({ convert: false }) //do not convert string to number
    .positive()
    .required()
    .messages({
      'number.positive': 'amount: {{amount}}, must be a positive number'
    })
  })
  return schema.validate(data);
}

module.exports = { transferValidation }