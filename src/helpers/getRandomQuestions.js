const getRandomQuestions = (data, randomFn) => {
  const uniqueSet = new Set();
  const responseData = [];

  do {
    const randomNumber = randomFn(data.length);
    const { _id, question, answers } = data[randomNumber];
    uniqueSet.add(_id);
    uniqueSet[_id] = { _id, question, answers };
  } while (uniqueSet.size < 12);

  uniqueSet.forEach((idx, a, set) => responseData.push(uniqueSet[idx]));

  return responseData;
};

module.exports = getRandomQuestions;
