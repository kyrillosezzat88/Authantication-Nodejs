const Joi = require('@hapi/joi');

//Register validation

const RegValidations = data => {
    const schema = Joi.object({
        name:Joi.string().required().min(6),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    });
    return schema.validate(data);
}

//Login Validations 
const LoginValidations = (data) => {
    const Schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    });
    return Schema.validate(data);
}

module.exports.RegValidations = RegValidations;
module.exports.LoginValidations = LoginValidations;