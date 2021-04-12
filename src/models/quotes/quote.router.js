const { Router } = require('express');
const quoteRouter = Router();
const quoteController = require('./quote.controller');

quoteRouter.get('/quotes', quoteController.getQuotes);

module.exports = quoteRouter;
