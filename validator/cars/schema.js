const joi = require('@hapi/joi')

const carDataSchema = joi.object({
    make: joi.string().min(2).max(20).required(),
    model: joi.string().min(2).max(20).required(),
    year: joi.string().min(4).max(4).required(),
    color: joi.string().min(3).max(15).required(),
    engineCapacity: joi.string().min(2).max(25).required(),
    transmission: joi.string().min(6).max(15).required(),
    noOfSeats: joi.number().min(1).max(32).required(),
})

module.exports = {carDataSchema, idSchema}