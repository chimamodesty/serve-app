const routes = require('express').Router()
const handymanControllers = require("../contollers/handyman")

routes.get("/", handymanControllers.getAll)
routes.get("/:id", handymanControllers.getSingle)
routes.post("/", handymanControllers.createHandyman)
routes.put("/:id", handymanControllers.updateHandyman)
routes.delete("/:id", handymanControllers.deleteHandyman)
routes.get("/profession/:profession", handymanControllers.getProfession)

module.exports = routes