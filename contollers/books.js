const mongodb = require('../db/connect')
var ObjectId = require('mongodb').ObjectId
const {bookschema } = require("../validator/index")


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
    const validation = await bookschema.validate(req.body)
    const {error} = validation

    if(error){
        const message = error.details.map( x => x.message)
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
    
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
}

const updatebooks = async (req, res, next) => {
    const validation = req.params.id

    if(validation.length != 24 ){
        const message = "The id parameter should not me more than or lesser than 24 characters"
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
    
    const userId = new ObjectId(req.params.id)
    await mongodb.getDb().db().collection('books').updateOne(
        {'_id': userId},
        {$set: {...req.body}} 
        )
        .then(result => 
            res.status(204).json(result))
        .catch(err => res.status(400).json({'error': err.message}))
}

}


const deletebooks = async (req, res, next) => {
    const validation = req.params.id

    if(validation.length != 24 ){
        const message = "The id parameter should not me more than or lesser than 24 characters"
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
    
    const userId = new ObjectId(req.params.id)
    
    await mongodb.getDb().db().collection('books').deleteOne({'_id': userId})
        .then(result => res.status(200).json({"deletedId": req.params.id, ...result}))
}
}

module.exports = {
    getAll, 
    createbooks,
    updatebooks,
    deletebooks

 }