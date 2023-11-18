const mongodb = require('../db/connect')

const getAll = async( req, res, next) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection("books")
        .find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(lists)
    })
}

const createbooks = async(req, res) => {
    const books = {
        author: req.body.author,
        title: req.body.title,
        edition: req.body.edition,
        year: req.body.year
    }

    const response = await mongodb
        .getDb()
        .db()
        .collection("books")
        .insertOne(books)

    if (response.acknowledged) {
        res.status(201).json(response)
        } else {
        res.status(500).json(response.error || 'Some error occured while entering the ward details.')
        }

}

module.exports = {getAll, createbooks}