const { globalError, ClientError } = require("shokhijakhon-error-handler");
const {
  todoValidator,
  todoUpdateValidator,
} = require("../utils/validator/Todo.validator");
const TodoModel = require("../models/Todo.model");

module.exports = {
  async CREATE_TODO(req, res) {
    try {
      if (!req.user?.user_id) throw new ClientError("Unauthorized", 401);

      await todoValidator.validateAsync(req.body);

      const insertTodo = await TodoModel.create({
        title: req.body.title,
        user_id: req.user.user_id,
      });

      return res.status(201).json({
        message: "Todo successfully created",
        status: 201,
        id: insertTodo._id,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },

  async GET_TODO(req, res) {
    try {
      const todos = await TodoModel.find().sort({ createdAt: -1 });
      return res.json({ status: 200, data: todos });
    } catch (err) {
      return globalError(err, res);
    }
  },

  async UPDATE_TODO(req, res) {
    try {
      const { id } = req.params;

      if (!req.user?.user_id) throw new ClientError("Unauthorized", 401);

      await todoUpdateValidator.validateAsync(req.body);

      const todo = await TodoModel.findById(id);
      if (!todo) throw new ClientError("Todo not found", 404);

      // ✅ ownership check
      if (todo.user_id.toString() !== req.user.user_id) {
        throw new ClientError("You can update only your todo", 403);
      }

      todo.title = req.body.title;
      await todo.save();

      return res.json({
        message: "Todo successfully updated",
        status: 200,
        data: todo,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },

  async DELETE_TODO(req, res) {
    try {
      const { id } = req.params;

      if (!req.user?.user_id) throw new ClientError("Unauthorized", 401);

      const todo = await TodoModel.findById(id);
      if (!todo) throw new ClientError("Todo not found", 404);

      if (todo.user_id.toString() !== req.user.user_id) {
        throw new ClientError("You can delete only your todo", 403);
      }

      await todo.deleteOne();

      return res.status(200).json({
        message: "Todo successfully deleted",
        status: 200,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
