const bcrypt = require('bcrypt');

const User = require('./User');

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
          email: data.email,
          name: data.name,
          avatarURL: data.avatarURL,
        })
        .status(201);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .json({
            message: 'Email is duplicated',
          })
          .status(400);
      }
      next(err);
    }
  }
}

const userController = new UsersController();
module.exports = userController;
