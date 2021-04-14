const bcrypt = require('bcrypt');

const checkPasswordBCrypt = async (password, saltPassword) => {
  const result = await bcrypt.compare(password, saltPassword);
  return result;
};

module.exports = checkPasswordBCrypt;
