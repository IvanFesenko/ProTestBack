const TheoreticalData = require('./TheoreticalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');
const createArrayFromAnswersId = require('../../helpers/createArrayFromAnswersId');

class TheoreticalDataControllers {
  getTests = async (_req, res, next) => {
    try {
      const questionData = await TheoreticalData.find({});
      const responseData = getRandomQuestions(questionData, getRandomNumber);

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'theoretical questions',
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
    const responseData = [];
    const answersId = createArrayFromAnswersId(answers);

    try {
      const questions = await TheoreticalData.find({
        _id: { $in: answersId },
      });

      for (let i = 0; i < 3; i++) {
        responseData.push({
          _id: questions[i]._id,
          question: answers[questions[i]._id],
          userAnswerIs: questions[i].rightAnswer === answers[questions[i]._id],
        });
      }

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'theoretical answers',
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

const theoreticalDataController = new TheoreticalDataControllers();
module.exports = theoreticalDataController;
