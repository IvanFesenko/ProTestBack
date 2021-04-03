const mongoose = require('mongoose');

const { Schema } = mongoose;

const technicalDataSchema = new Schema(
    {
        question: {
            type: String,
            required: [true, 'please enter question'],
        },
        answers: {
            type: Array,
            require: [true, 'please add answers'],
        },
        rightAnswer: {
            type: String,
            require: [true, 'please enter right answer'],
        },
    },
    { versionKey: false, timestamps: true },
);

const TechnicalData = mongoose.model('technicalData', technicalDataSchema);
module.exports = TechnicalData;
