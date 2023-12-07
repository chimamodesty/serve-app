const joi = require('@hapi/joi')

const artistsDataSchema = joi.object({
    name: joi.string().min(1).max(40).required(),
    genre: joi.string().min(2).max(50).required(),
    releaseDate: joi.number().min(4).max(4).required(),
    album: joi.string().min(1).max(50).required(),
})

module.exports = {artistsDataSchema}