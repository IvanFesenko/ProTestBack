const bcrypt = require('bcrypt');

const User = require('./User');
const httpCode = require('../../constants/httpCode');

class UsersController {
  get registration() {
    return this._registration.bind(this);
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
}

const userController = new UsersController();
module.exports = userController;
