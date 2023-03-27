const Joi = require('joi')

const accountNumberValidation = (data) => {
  const schema = Joi.object({
    accountno: Joi.string().regex(/^[0-9]{8}$/).messages({'string.pattern.base': `Account number must have 8 digits.`}).required()
  })
  return schema.validate(data);
}

module.exports = { accountNumberValidation }