const TechnicalData = require('./TechnicalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');

class TechnicalDataControllers {
  getTests = async (_req, res, next) => {
    try {
      const questionData = await TechnicalData.find({});
      const responseData = getRandomQuestions(questionData, getRandomNumber);
      console.log(responseData);

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'technical questions',
        quantity: responseData.length,
        requestBody: responseData,
      });
    } catch (err) {
      next(err.message);
    }
  };

  checkAnswer = async (req, res, next) => {
    try {
      console.log(req.body);

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'technical questions',
      });
    } catch (err) {
      next(err.message);
    }
  };
}

const technicalDataController = new TechnicalDataControllers();
module.exports = technicalDataController;
