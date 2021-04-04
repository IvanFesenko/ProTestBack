const mongoose = require('mongoose');

const createArrayFromAnswersId = answers => {
  const answersId = Object.keys(answers).map(id =>
    mongoose.Types.ObjectId(`${id}`),
  );

  return answersId;
};
module.exports = createArrayFromAnswersId;
