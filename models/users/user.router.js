const { Router } = require('express');
const userRouter = Router();

const userController = require('./user.controller.js');

const { validate } = require('../../helpers/validate.js');
const {
  registrationValidateSchema,
} = require('../../helpers/validateSchemas.js');

userRouter.post(
  '/registration',
  validate(registrationValidateSchema),
  userController.registration,
);

module.exports = userRouter;
