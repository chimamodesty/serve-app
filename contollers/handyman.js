const mongodb = require('../db/connect')
const  ObjectId = require("mongodb").ObjectId
const {handymanDataSchema,  professionSchema, idSchema } = require("../validator/handyman/schema")

const createHandyman = async(req, res) => {
    const validation = await handymanDataSchema.validate(req.body)
    const {error} = validation

    if(error){
        const message = error.details.map( x => x.message)
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
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
}

const updateHandyman = async (req, res) => {
    const validation = await handymanDataSchema.validate(req.body)
    const {error} = validation

    if(error){
        const message = error.details.map( x => x.message)
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
        const handymanId = new ObjectId(req.params.id);
        const handyman = {
            name: req.body.name,
            profession: req.body.profession,
            city: req.body.city,
            tel: req.body.tel
        };
        const response = await mongodb
        .getDb()
        .db()
        .collection('handyman')
        .replaceOne({_id: handymanId}, handyman);
        if(response.modifiedCount > 0){
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the ward.')
        }
    }
}

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

const getSingle = async( req, res, next) => {
    const validation = req.params.id

    if(validation.length != 24 ){
        const message = "Your id is lesser or higher than 24 characters"
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
    const handymanId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection("handyman")
        .find({_id: handymanId});
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(lists)
    })
}}

const getProfession = async (req, res, next) => {
    const validation = req.params.profession

    if(validation.length < 3 ){
        const message = "Your profession should be more than two characters long"
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
        const handymanProfession = req.params.profession;
        const result = await mongodb
        .getDb()
        .db()
        .collection("handyman")
        .find({ profession: handymanProfession });
        result.toArray().then((lists) => {
        res.status(200).json(lists);
        });
    }
  };

//Delete route
const deleteHandyman = async(req, res) => {
    const validation = req.params.id

    if(validation.length != 24 ){
        const message = "Your id is lesser or higher than 24 characters"
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
    const handymanId = new ObjectId(req.params.id)
    const response = await mongodb
    .getDb()
    .db()
    .collection('handyman')
    .deleteMany({_id: handymanId}, true);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the ward.')
    }
}};

module.exports = {getAll, createHandyman, getProfession, updateHandyman, getSingle, deleteHandyman}