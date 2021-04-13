const jwt = require('jsonwebtoken');

const User = require('../models/users/User');
const httpCode = require('../constants/httpCode');

const authorizeUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({
        message: 'Not authorized',
      });
    }

    const { userId } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById(userId);
    if (!user || (user && token !== user.token)) {
      return res.status(httpCode.UNAUTHORIZED).send({
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(httpCode.FORBIDDEN).send({
      message: err.message,
    });
  }
};

module.exports = authorizeUser;

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *             - email
 *             - password
 *            properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: testEmail@mail.com
 *               password:
 *                   type: string
 *                   description: The user's password.
 *                   example: nk=nHjukJ5KEA\5>
 *     responses:
 *       200:
 *         description: login
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             token:
 *              type: string
 *             user:
 *              type: object
 *              properties:
 *                 id:
 *                  type: string
 *                  description: The user ID.
 *                  example: 6069b6d3aaae991b083ad1f0
 *                 name:
 *                  type: string
 *                  description: The user's name.
 *                  example: LeanneGraham
 *                  email:
 *                   type: string
 *                   description: The user's email.
 *                   example: testEmail@mail.com
 */
