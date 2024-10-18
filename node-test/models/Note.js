const Joi = require("joi");
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

function validateCreateNote(object) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().max(5000).min(3).required(),
  });

  return schema.validate(object);
}

module.exports = {
  Note,
  validateCreateNote,
};
