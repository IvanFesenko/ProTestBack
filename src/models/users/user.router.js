const { Router } = require('express');
const userRouter = Router();

const userController = require('./user.controller.js');

const { validate } = require('../../helpers/validate.js');
const {
  registrationValidateSchema,
  loginUserValidateSchema,
} = require('../../helpers/validateSchemas.js');
const authorizeUser = require('../../helpers/authorizeUser.js');

userRouter.post(
  '/registration',
  validate(registrationValidateSchema),
  userController.registration,
);

userRouter.post(
  '/login',
  validate(loginUserValidateSchema),
  userController.loginUser,
);

userRouter.post('/logout', authorizeUser, userController.logoutUser);

module.exports = userRouter;
