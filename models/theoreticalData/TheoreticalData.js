const mongoose = require('mongoose');

const { Schema } = mongoose;

const theoreticalDataSchema = new Schema(
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

const TheoreticalData = mongoose.model(
    'theoreticalData',
    theoreticalDataSchema,
);
module.exports = TheoreticalData;
