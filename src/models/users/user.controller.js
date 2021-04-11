const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queryString = require('query-string');
const axios = require('axios');
const passwordGenerator = require('generate-password');

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

  get googleAuth() {
    return this._googleAuth.bind(this);
  }

  get googleRedirect() {
    return this._googleRedirect.bind(this);
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

      const token = await jwt.sign(
        { userId: data._id },
        process.env.PRIVATE_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME },
      );

      await User.findUserByIdAndUpdate(data._id, { token });

      res
        .json({
          token,
          user: {
            id: data._id,
            email: data.email,
            name: data.name,
            avatarURL: data.avatarURL,
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
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME },
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

  async _googleAuth(req, res, next) {
    try {
      const stringifiedParams = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: `${process.env.BACKEND_URL}/auth/google-redirect`,
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      });
      return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
      );
    } catch (err) {
      next(err);
    }
  }

  async _googleRedirect(req, res, next) {
    try {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const urlObj = new URL(fullUrl);
      const urlParams = queryString.parse(urlObj.search);
      const code = urlParams.code;
      const tokenData = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET_KEY,
          redirect_uri: `${process.env.BACKEND_URL}/auth/google-redirect`,
          grant_type: 'authorization_code',
          code,
        },
      });
      const userData = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
      });

      const existingUser = await User.findUserByEmail(userData.data.email);
      console.log(userData);
      if (!existingUser) {
        const password = passwordGenerator.generate({
          length: 10,
          numbers: true,
        });

        //TODO: send password with nodemailer

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
          email: userData.email,
          name: userData.name,
          password: hashedPassword,
        });
        // return res.status(httpCode.FORBIDDEN).send({
        //   message:
        //     'Make registration with our web-site first. We use googleAuth only for sign-in',
        // });
      }

      const accessToken = jwt.sign(
        { userId: existingUser._id },
        process.env.PRIVATE_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME },
      );

      await User.findUserByIdAndUpdate(existingUser._id, {
        token: accessToken,
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/google-redirect?accessToken=${accessToken}`,
      );
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UsersController();
module.exports = userController;
