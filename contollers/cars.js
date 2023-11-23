const mongodb = require('../db/connect')
const  ObjectId = require("mongodb").ObjectId
const {carDataSchema,  idSchema, } = require("../validator/cars/schema")

const createCar = async(req, res) => {
    const validation = await carDataSchema.validate(req.body)
    const {error} = validation

    if(error){
        const message = error.details.map( x => x.message)
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
        const car = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            engineCapacity: req.body.engineCapacity,
            transmission: req.body.transmission,
            noOfSeats: req.body.noOfSeats
        }

        const response = await mongodb
            .getDb()
            .db()
            .collection("cars")
            .insertOne(car)

        if (response.acknowledged) {
            res.status(201).json(response)
            } else {
            res.status(500).json(response.error || 'Some error occured while entering the ward details.')
            }
    }
}

const updateCar = async (req, res) => {
    const validation = await carDataSchema.validate(req.body)
    const {error} = validation

    if(error){
        const message = error.details.map( x => x.message)
        res.status(400).json({
          status: "error",
          message : "invalid request data",
          data: message
        })  
    } else {
        const carId = new ObjectId(req.params.id);
        const car = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            engineCapacity: req.body.engineCapacity,
            transmission: req.body.transmission,
            noOfSeats: req.body.noOfSeats
        }
        const response = await mongodb
        .getDb()
        .db()
        .collection('cars')
        .replaceOne({_id: carId}, car);
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
        .collection("cars")
        .find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(lists)
    })
}

const getSingle = async( req, res, next) => {
    const carId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection("cars")
        .find({_id: carId});
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(lists)
    })
}


const deleteCar = async(req, res) => {
    const carId = new ObjectId(req.params.id)
    const response = await mongodb
    .getDb()
    .db()
    .collection('cars')
    .deleteMany({_id: carId}, true);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occured while deleting the ward.')
    }
  };


module.exports = {getAll, createCar, updateCar, getSingle, deleteCar}