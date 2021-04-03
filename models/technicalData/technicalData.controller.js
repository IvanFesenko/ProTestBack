const TechnicalData = require('./TechnicalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');

class technicalDataControllers {
    constructor() {}

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
        } catch (error) {
            console.log(error.message);
        }
    };
}

const technicalDataController = new technicalDataControllers();
module.exports = technicalDataController;
