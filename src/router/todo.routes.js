const { Router } = require("express");
const todoController = require("../controllers/todo.controller");

const todoRouter = Router();

todoRouter.post("/create", todoController.CREATE_TODO);
todoRouter.get("/all", todoController.GET_TODO);

todoRouter
  .route("/:id")
  .put(todoController.UPDATE_TODO)
  .delete(todoController.DELETE_TODO);

module.exports = todoRouter;
