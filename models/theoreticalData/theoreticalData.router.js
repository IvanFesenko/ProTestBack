const { Router } = require('express');
const theoreticalDataRouter = Router();

const theoreticalDataController = require('./theoreticalData.controllers');

theoreticalDataRouter
  .get('/theoretical', theoreticalDataController.getTests)
  .post('/theoretical', theoreticalDataController.checkAnswer);

module.exports = theoreticalDataRouter;
