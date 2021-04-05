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

  async _registration(req, res, next) {
    try {
      const {
        body: { password },
      } = req;
      const hashedPassword = await bcrypt.hash(password, 10);

      const data = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      res
        .json({
          id: data._id,
          email: data.email,
          name: data.name,
          avatarURL: data.avatarURL,
        })
        .status(httpCode.CREATED);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .json({
            message: 'Email is duplicated',
          })
          .status(httpCode.BAD_REQUEST);
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
}

const userController = new UsersController();
module.exports = userController;