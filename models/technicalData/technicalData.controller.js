const mongoose = require('mongoose');
const TechnicalData = require('./TechnicalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');

class TechnicalDataControllers {
  getTests = async (_req, res) => {
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
      console.log(err.message);
    }
  };

  checkAnswer = async (req, res) => {
    const answers = req.body;
    const answersId = Object.keys(answers).map(id =>
      mongoose.Types.ObjectId(`${id}`),
    );
    let responseData = [];

    try {
      const questions = await TechnicalData.find({
        _id: { $in: answersId },
      });

      console.log(questions);

      for (let i = 0; i < 3; i++) {
        responseData.push({
          _id: questions[i]._id,
          question: answers[questions[i]._id],
          userAnswerIs: questions[i].rightAnswer === answers[questions[i]._id],
        });
      }

      res.status(httpCode.OK).json({
        status: httpCode.OK,
        type: 'technical questions',
        body: responseData,
      });
    } catch (err) {
      console.log(err.message);

      //todo delete before deploy
      res.json({
        error: err.message,
      });
    }
  };
}

const technicalDataController = new TechnicalDataControllers();
module.exports = technicalDataController;
