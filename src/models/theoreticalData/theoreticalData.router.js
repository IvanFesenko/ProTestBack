const { Router } = require('express');
const theoreticalDataRouter = Router();

const authorizeUser = require('../../helpers/authorizeUser.js');

const theoreticalDataController = require('./theoreticalData.controllers');

theoreticalDataRouter
  .get('/theoretical', authorizeUser, theoreticalDataController.getTests)
  .post('/theoretical', authorizeUser, theoreticalDataController.checkAnswer);

module.exports = theoreticalDataRouter;
