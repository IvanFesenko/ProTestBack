const mongoose = require('mongoose');

const { Schema } = mongoose;

const quoteSchema = new Schema(
  {
    quote: {
      type: String,
      required: [true, 'please enter quote'],
    },
    author: {
      type: String,
      require: [true, 'please add author'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Quote = mongoose.model('quote', quoteSchema);
module.exports = Quote;
