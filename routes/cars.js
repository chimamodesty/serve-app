const routes = require('express').Router()
const carsControllers = require("../contollers/cars")

routes.get("/", carsControllers.getAll)    
routes.get("/:id", carsControllers.getSingle)
routes.delete("/:id", carsControllers.deleteCar)
routes.post("/", carsControllers.createCar)
routes.put("/:id", carsControllers.updateCar)


module.exports = routes