const { Router } = require('express');
const technicalDataRouter = Router();
const technicalDataController = require('./technicalData.controller');

const { validateAnswer } = require('../../helpers/validate.js');
const {
  technicalAnswerValidateSchema,
} = require('../../helpers/validateSchemas.js');

technicalDataRouter.get('/technical', technicalDataController.getTests);

technicalDataRouter.post(
  '/technical',
  validateAnswer(technicalAnswerValidateSchema),
  technicalDataController.checkAnswer,
);

module.exports = technicalDataRouter;
