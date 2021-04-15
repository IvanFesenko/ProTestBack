const { Router } = require('express');
const technicalDataRouter = Router();
const technicalDataController = require('./technicalData.controller');

const { validateAnswer } = require('../../helpers/validate.js');
const {
  technicalAnswerValidateSchema,
} = require('../../helpers/validateSchemas.js');
const authorizeUser = require('../../helpers/authorizeUser.js');

technicalDataRouter
  .get('/technical', authorizeUser, technicalDataController.getTests)
  .post(
    '/technical',
    authorizeUser,
    validateAnswer(technicalAnswerValidateSchema),
    technicalDataController.checkAnswer,
  );

module.exports = technicalDataRouter;
