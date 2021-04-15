const mongoose = require('mongoose');

const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: String,
      require: [true, 'add user id'],
    },
    refreshToken: {
      type: String,
      required: [true, 'add token'],
    },
    fingerprint: {
      type: String,
      require: [true, 'please add author'],
    },
    createdAt: {
      type: Number,
      require: [true, 'add createdAt'],
    },
    ip: {
      type: Number,
      require: [true, 'add ip'],
    },
  },
  { versionKey: false, timestamps: true },
);

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);
module.exports = RefreshToken;
