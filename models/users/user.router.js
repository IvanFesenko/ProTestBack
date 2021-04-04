const { Router } = require('express');
const userRouter = Router();

const userController = require('./user.controller.js');

const { validate } = require('../../helpers/validate.js');
const {
  registrationValidateSchema,
  loginUserValidateSchema,
} = require('../../helpers/validateSchemas.js');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user uniq email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         name: Test
 *         email: test@bk.com
 *         password: "123456"
 */

/**
 * @swagger
 * definitions:
 *   Registration:
 *     required:
 *       - email
 *        -name
 *        -id
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *       name:
 *         type: string
 *       avatarUrl:
 *         type: string
 */

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         content:
 *          application/json:
 *             schema:
 *                type: object
 *                $ref: '#/definitions/Registration'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

userRouter.post(
  '/registration',
  validate(registrationValidateSchema),
  userController.registration,
);

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

userRouter.post(
  '/login',
  validate(loginUserValidateSchema),
  userController.loginUser,
);

module.exports = userRouter;
