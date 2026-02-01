const Joi = require("joi");

const registerValidator = Joi.object({
  firstname: Joi.string().trim().min(2).required().messages({
    "any.required": "firstname required !",
    "string.empty": "firstname required !",
    "string.min": "firstname must be at least 2 characters",
  }),
  lastname: Joi.string().trim().min(2).required().messages({
    "any.required": "lastname required !",
    "string.empty": "lastname required !",
    "string.min": "lastname must be at least 2 characters",
  }),
  age: Joi.number().integer().min(1).max(120).required().messages({
    "any.required": "age required !",
    "number.base": "age must be a number",
    "number.min": "age must be at least 1",
    "number.max": "age must be at most 120",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.required": "gender required !",
    "any.only": "gender must be male or female",
    "string.empty": "gender required !",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "email required !",
    "string.email": "email must be valid",
    "string.empty": "email required !",
  }),
  password: Joi.string().min(3).required().messages({
    "any.required": "password required !",
    "string.min": "password must be at least 3 characters",
    "string.empty": "password required !",
  }),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "email required !",
    "string.email": "email must be valid",
    "string.empty": "email required !",
  }),
  password: Joi.string().min(3).required().messages({
    "any.required": "password required !",
    "string.min": "password must be at least 3 characters",
    "string.empty": "password required !",
  }),
});

module.exports = { registerValidator, loginValidator };
