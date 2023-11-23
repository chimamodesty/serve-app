const express = require('express');
const routes = express.Router()

const authController = require("../contollers/auth")


routes.get('/', authController.Oauth)
routes.get('/callback', authController.handleCallback )
module.exports = routes; 