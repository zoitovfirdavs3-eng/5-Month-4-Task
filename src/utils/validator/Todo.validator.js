const Joi = require("joi");

const todoValidator = Joi.object({
  title: Joi.string().required().trim().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title must not be empty",
    "any.required": "Title is required",
  }),
});

const todoUpdateValidator = Joi.object({
  title: Joi.string().required().trim().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title must not be empty",
    "any.required": "Title is required",
  }),
});

module.exports = { todoValidator, todoUpdateValidator };
