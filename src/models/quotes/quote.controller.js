const Quote = require('./Quote');

const getQuote = async (req, res, next) => {
  try {
    const quotesID = await Quote.find({ program: { $in: [] } }).distinct('_id');

    console.log(quotesID);
  } catch (err) {
    next(err.message);
  }
};

module.exports = getQuote;
