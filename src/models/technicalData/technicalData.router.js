const { Router } = require('express');
const technicalDataRouter = Router();
const technicalDataController = require('./technicalData.controller');

const { validateAnswer } = require('../../helpers/validate.js');
const {
  technicalAnswerValidateSchema,
} = require('../../helpers/validateSchemas.js');

/**
 * @swagger
 * tags:
 *   name: TechnicalTests
 *   description: Get questions and post answers
 */

/**
 * @swagger
 * /tests/technical:
 *    get:
 *     summary: get technical tests
 *     tags: [TechnicalTests]
 *     responses:
 *      200:
 *         description: OK
 *      401:
 *         description: Unauthorized
 *      403:
 *          description: Forbidden
 */

technicalDataRouter.get('/technical', technicalDataController.getTests);

technicalDataRouter.post(
  '/technical',
  validateAnswer(technicalAnswerValidateSchema),
  technicalDataController.checkAnswer,
);

technicalDataRouter.post('/technical', technicalDataController.checkAnswer);

module.exports = technicalDataRouter;
