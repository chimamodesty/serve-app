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

module.exports = {handymanDataSchema}