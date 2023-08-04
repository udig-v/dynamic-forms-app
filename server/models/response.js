const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  responses: [
    {
      question: {
        type: String,
        required: true,
      },
      response: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
