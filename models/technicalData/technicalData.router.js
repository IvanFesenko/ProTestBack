const { Router } = require('express');
const technicalDataRouter = Router();

const technicalDataController = require('./technicalData.controller');

technicalDataRouter.get('/technical', technicalDataController.getTests);

module.exports = technicalDataRouter;
