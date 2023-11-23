const joi = require('@hapi/joi')

const handymanDataSchema = joi.object({
    name: joi.string().min(2).max(40).required(),
    profession: joi.string().min(2).max(20).required(),
    city: joi.string().min(2).max(25).required(),
    tel: joi
    .string()
    .min(7)
    .max(12)
    .regex(/^([+])?(\d+)$/)
    .required(), 
})

const professionSchema = joi.object({
    params: {
        profession: joi.string().max(24).min(24).required()
    }
})

const idSchema = joi.object({
    params: {
        id: joi.string().max(24).min(24).required()
    }
})

module.exports = {handymanDataSchema, idSchema, professionSchema}