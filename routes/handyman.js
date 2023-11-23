const routes = require('express').Router()
const handymanControllers = require("../contollers/handyman")

routes.post("/", handymanControllers.createHandyman)
routes.get("/", handymanControllers.getAll)
routes.get("/:profession", handymanControllers.getProfession)
routes.put("/:id", handymanControllers.updateHandyman)
routes.delete("/:id", handymanControllers.getProfession)

module.exports = routes