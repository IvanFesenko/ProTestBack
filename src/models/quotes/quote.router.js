const { Router } = require('express');
const quoteRouter = Router();

const authorizeUser = require('../../helpers/authorizeUser.js');

const quoteController = require('./quote.controller');

quoteRouter.get('/quotes', authorizeUser, quoteController.getQuotes);

module.exports = quoteRouter;
