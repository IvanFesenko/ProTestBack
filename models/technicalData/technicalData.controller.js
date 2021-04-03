const TechnicalData = require('./TechnicalData');

class technicalDatasController {
    constructor() {}

    getTests = async (req, res, next) => {
        try {
            const questionData = await TechnicalData.find();
            console.log(questionData);
            res.status(200).json({
                status: 200,
                requestBody: questionData,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}

const technicalDataController = new technicalDatasController();
module.exports = technicalDataController;
