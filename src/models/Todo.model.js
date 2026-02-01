const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required !"],
      trim: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = model("todos", todoSchema);
