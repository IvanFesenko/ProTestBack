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

userRouter.get('/auth/google', userController.googleAuth);

userRouter.get('/auth/google-redirect', userController.googleRedirect);

userRouter.get('/current-user', authorizeUser, userController.currentUser);

userRouter.post(
  '/change-password',
  authorizeUser,
  userController.changePassword,
);

module.exports = userRouter;
