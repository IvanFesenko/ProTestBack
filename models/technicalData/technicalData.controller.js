const TechnicalData = require('./TechnicalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');

class technicalDataControllers {
    getTests = async (_req, res) => {
        try {
            const questionData = await TechnicalData.find({});
            const responseData = getRandomQuestions(
                questionData,
                getRandomNumber,
            );

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
        try {
            console.log(req.body);

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
}

const technicalDataController = new technicalDataControllers();
module.exports = technicalDataController;
