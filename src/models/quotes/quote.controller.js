const Quote = require('./Quote');
const httpCode = require('../../constants/httpCode');
const randomNumber = require('../../helpers/getRandomNumber');

class QuoteController {
  async getQuotes(req, res, next) {
    try {
      const countDocuments = await Quote.countDocuments((err, count) => count);
      const response = await Quote.findOne().skip(randomNumber(countDocuments));

      if (!response) res.status(httpCode.NOT_FOUND);

      res.status(httpCode.OK).json({
        responseBody: response,
      });
    } catch (err) {
      next(err.message);
    }
  }
}

const quoteController = new QuoteController();

module.exports = quoteController;
