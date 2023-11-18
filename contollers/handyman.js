const mongodb = require('../db/connect')

const getAll = async( req, res, next) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection("handyman")
        .find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(lists)
    })
}

const createHandyman = async(req, res) => {
    const handyman = {
        name: req.body.name,
        profession: req.body.profession,
        city: req.body.city,
        tel: req.body.tel
    }

    const response = await mongodb
        .getDb()
        .db()
        .collection("handyman")
        .insertOne(handyman)

    if (response.acknowledged) {
        res.status(201).json(response)
        } else {
        res.status(500).json(response.error || 'Some error occured while entering the ward details.')
        }

}

module.exports = {getAll, createHandyman}