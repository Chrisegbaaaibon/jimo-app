const routes = require('express').Router();
const { requestBrochure } = require('../controller.js/handler')

routes.post('/req', requestBrochure)

module.exports = routes