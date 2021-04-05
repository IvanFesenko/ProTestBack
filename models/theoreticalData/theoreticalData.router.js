const { Router } = require('express');
const theoreticalDataRouter = Router();

const theoreticalDataController = require('./theoreticalData.controllers');

/**
 * @swagger
 * tags:
 *   name: TheoreticalTests
 *   description: Get questions and post answers
 */

/**
 * @swagger
 * /tests/theoretical:
 *    get:
 *     summary: get technical tests
 *     tags: [TheoreticalTests]
 *     responses:
 *      200:
 *         description: OK
 *      401:
 *         description: Unauthorized
 *      403:
 *          description: Forbidden
 */

theoreticalDataRouter.get('/theoretical', theoreticalDataController.getTests);

theoreticalDataRouter.post(
  '/theoretical',
  theoreticalDataController.checkAnswer,
);

module.exports = theoreticalDataRouter;
