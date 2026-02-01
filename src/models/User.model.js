const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required !"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "lastname is required !"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "age is required !"],
      min: [1, "age must be at least 1"],
      max: [120, "age must be at most 120"],
    },
    gender: {
      type: String,
      required: [true, "gender is required !"],
      enum: ["male", "female"],
    },
    email: {
      type: String,
      required: [true, "email is required !"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required !"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("users", userSchema);
