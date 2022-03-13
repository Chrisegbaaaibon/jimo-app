const routes = require('express').Router();
const { requestBrochure, getUsers } = require('../controller.js/handler')

routes.post('/req', requestBrochure);

routes.get('/users', getUsers)

module.exports = routes;