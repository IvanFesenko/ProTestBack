const mongoose = require('mongoose');
const gravatar = require('gravatar');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your Name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter Email Address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter Email Password'],
    },
    avatarURL: {
        type: String,
        default: function () {
            return gravatar.url(
                this.email,
                { s: '250', r: 'x', d: 'retro' },
                true,
            );
        },
    },
    token: { type: String, default: null },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
