const jwt = require("jsonwebtoken");
const { Note, validateCreateNote } = require("../models/Note");

/**
 * @description create note function
 * @route /notes
 * @method post
 * @access private(logged user)
 */
module.exports.createNoteCtrl = async (req, res) => {
  try {
    const { error } = validateCreateNote(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const note = await Note.create({
      userId: req.userId,
      title: req.body.title,
      content: req.body.content,
    });

    res.status(200).json({ note: note, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).populate({
      path: "userId",
      select: "_id email name",
    });

    res.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 *
 */
module.exports.getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({ userId: req.userId, _id: req.params.id });

    res.status(200).json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      note._id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: "success", updatedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteSingleNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      userId: req.userId,
      _id: req.params.id,
    });

    res.status(200).json({ success: true, message: "success", deletedNote });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
