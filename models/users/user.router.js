const { Router } = require('express');
const userRouter = Router();

const userController = require('./user.controller.js');

const { validate } = require('../../helpers/validate.js');
const {
  registrationValidateSchema,
} = require('../../helpers/validateSchemas.js');

/**
 * @swagger
 * tags:
 *   name: ProTest
 *   description: The ProTest managing API
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
 *       200:
 *         content:
 *          application/json:
 *             schema:
 *                type: object
 *                $ref: '#/definitions/Registration'
 *       500:
 *         description: Some server error
 */

userRouter.post(
  '/registration',
  validate(registrationValidateSchema),
  userController.registration,
);

module.exports = userRouter;
