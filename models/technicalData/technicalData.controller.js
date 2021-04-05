const TechnicalData = require('./TechnicalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');
const createArrayFromAnswersId = require('../../helpers/createArrayFromAnswersId');
const comparisonOfQuestionsAndAnswers = require('../../helpers/comparisonOfQuestionsAndAnswers');

class TechnicalDataControllers {
  getTests = async (_req, res, next) => {
    try {
      const questionData = await TechnicalData.find({});
      const responseData = getRandomQuestions(questionData, getRandomNumber);

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'technical questions',
        quantity: responseData.length,
        requestBody: responseData,
      });
    } catch (err) {
      next(err.message);
      //todo: delete before public
      res.status(httpCode.NOT_FOUND).json({
        message: err.message,
      });
    }
  };

  checkAnswer = async (req, res, next) => {
    const answers = req.body;
    const answersId = createArrayFromAnswersId(answers);

    try {
      const questions = await TechnicalData.find({
        _id: { $in: answersId },
      });

      const responseData = comparisonOfQuestionsAndAnswers(questions, answers);

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'technical answers',
        quantity: responseData.length,
        requestBody: responseData,
      });
    } catch (err) {
      next(err.message);
      //todo: delete before public
      res.status(httpCode.NOT_FOUND).json({
        message: err.message,
      });
    }
  };
}

const technicalDataController = new TechnicalDataControllers();
module.exports = technicalDataController;
