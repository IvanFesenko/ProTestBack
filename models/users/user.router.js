const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

userRouter.get("/testEndPoint", userController.testController);

module.exports = userRouter;
