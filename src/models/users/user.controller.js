const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./User');
const httpCode = require('../../constants/httpCode');
const checkPasswordBCrypt = require('../../helpers/checkPasswordBCrypt');

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

  get changePassword() {
    return this._changePassword.bind(this);
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

      const userWithToken = await User.findByIdAndUpdate(user._id, { token });

      return res
        .status(httpCode.OK)
        .send({
          token: token,
          user: {
            id: userWithToken._id,
            email: userWithToken.email,
            name: userWithToken.name,
            avatarURL: userWithToken.avatarURL,
          },
        })
        .status(httpCode.CREATED);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(httpCode.CONFLICT).json({
          message: 'Email is duplicated',
        });
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

      const passwordCompareResult = checkPasswordBCrypt(
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

  async _changePassword(req, res, next) {
    const { newPassword, oldPassword } = req.body;
    const { _id, password } = req.user;

    try {
      const passwordCompareResult = await checkPasswordBCrypt(
        oldPassword,
        password,
      );

      if (!passwordCompareResult) {
        return res.status(httpCode.FORBIDDEN).json({
          status: httpCode.FORBIDDEN,
          message: 'forbidden',
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(_id, {
        password: hashedPassword,
      });

      res.status(httpCode.CREATED).json({
        message: 'password changed',
      });
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UsersController();
module.exports = userController;
