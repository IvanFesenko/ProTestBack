const comparisonOfQuestionsAndAnswers = (questions, answers) => {
  const responseData = [];

  for (let i = 0; i < 3; i++) {
    responseData.push({
      _id: questions[i]._id,
      question: answers[questions[i]._id],
      userAnswerIs: questions[i].rightAnswer === answers[questions[i]._id],
    });
  }

  return responseData;
};

module.exports = comparisonOfQuestionsAndAnswers;
