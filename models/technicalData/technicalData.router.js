const { Router } = require('express');
const technicalDataRouter = Router();

const technicalDataController = require('./technicalData.controller');

technicalDataRouter.get('/technical', technicalDataController.getTests);

technicalDataRouter.post('/technical', technicalDataController.checkAnswer);

module.exports = technicalDataRouter;
