const getRandomQuestions = (data, randomFn) => {
  const uniqueSet = new Set();
  const randomNumber = randomFn(data.length);

  do {
    const { _id, question, answers } = data[randomNumber];
    uniqueSet.add({ _id, question, answers });
  } while (uniqueSet.size < 12);

  return [...uniqueSet];
};

module.exports = getRandomQuestions;
