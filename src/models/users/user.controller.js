const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./User');
const httpCode = require('../../constants/httpCode');

class UsersController {
  get registration() {
    return this._registration.bind(this);
  }

  get loginUser() {
    return this._loginUser.bind(this);
  }

  get logoutUser() {
    return this._logoutUser.bind(this);
  }

  get currentUser() {
    return this._currentUser.bind(this);
  }

  async _registration(req, res, next) {
    try {
      const {
        body: { password },
      } = req;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const token = await jwt.sign(
        { userId: user._id },
        process.env.PRIVATE_KEY,
      );

      const updatedUser = await User.findByIdAndUpdate(user._id, { token });

      return res
        .status(httpCode.OK)
        .send({
          token: token,
          user: {
            id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            avatarURL: updatedUser.avatarURL,
          },
        })
        .status(httpCode.CREATED);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .json({
            message: 'Email is duplicated',
          })
          .status(httpCode.CONFLICT);
      }
      next(err);
    }
  }

  async _loginUser(req, res, next) {
    try {
      const {
        body: { email, password },
      } = req;

      const user = await User.findUserByEmail(email);
      if (!user) {
        return res
          .status(httpCode.BAD_REQUEST)
          .send('Authentication is failed');
      }

      const passwordCompareResult = await bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordCompareResult) {
        return res
          .status(httpCode.BAD_REQUEST)
          .send('Authentication is failed');
      }

      const token = await jwt.sign(
        { userId: user._id },
        process.env.PRIVATE_KEY,
      );

      await User.findUserByIdAndUpdate(user._id, { token });

      return res.status(httpCode.OK).send({
        token: token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatarURL: user.avatarURL,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async _logoutUser(req, res, next) {
    try {
      const userId = req.user._id;
      await User.findUserByIdAndUpdate(userId, { token: null });

      res.status(httpCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  async _currentUser(req, res, next) {
    const { _id, name, email, avatarURL } = req.user;
    try {
      res.status(httpCode.OK).json({
        responseBody: { _id, name, email, avatarURL },
      });
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UsersController();
module.exports = userController;
