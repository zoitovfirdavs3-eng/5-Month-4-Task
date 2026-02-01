const { Router } = require("express");
const authRouter = require("./auth.routes");
const authGuard = require("../guard/auth.guard");
const todoRouter = require("./todo.routes");

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use(authGuard);

mainRouter.use("/todo", todoRouter);

module.exports = mainRouter;
