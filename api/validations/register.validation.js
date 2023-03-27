const Joi = require('joi')

const registerValidation = (data) => {
  const schema = Joi.object({
    lastname: Joi.string().min(2).required(),
    firstname: Joi.string().min(2).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(2).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })
  return schema.validate(data);
}

module.exports = { registerValidation }