const getRandomQuestions = (data, maxNumber) => {
    const responseData = [];

    do {
        const randomNumber = maxNumber(data.length);
        responseData.map(item => {
            if (item._id === data[randomNumber]._id) return;
        });

        //delete rightAnswer
        const { _id, question, answers } = data[randomNumber];
        responseData.push({ _id, question, answers });
    } while (responseData.length < 12);

    return responseData;
};

module.exports = getRandomQuestions;
