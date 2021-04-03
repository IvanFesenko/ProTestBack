const TheoreticalData = require('./TheoreticalData');
const getRandomNumber = require('../../helpers/getRandomNumber');
const getRandomQuestions = require('../../helpers/getRandomQuestions');
const httpCode = require('../../constants/httpCode');

class theoreticalDataControllers {
    constructor() {}

    getTests = async (_req, res) => {
        try {
            const questionData = await TheoreticalData.find({});
            const responseData = getRandomQuestions(
                questionData,
                getRandomNumber,
            );

            res.status(httpCode.OK).json({
                status: httpCode.OK,
                type: 'theoretical questions',
                quantity: responseData.length,
                requestBody: responseData,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}

const theoreticalDataController = new theoreticalDataControllers();
module.exports = theoreticalDataController;
