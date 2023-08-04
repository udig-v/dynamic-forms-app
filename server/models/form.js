const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Untitled form",
    },
    description: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fields: [
      {
        question: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        answerOptions: {
          type: [String],
        },
      },
    ],
    shareableLink: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
