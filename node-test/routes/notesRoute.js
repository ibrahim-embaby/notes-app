const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Note } = require("../models/Note");
const {
  createNoteCtrl,
  getSingleNote,
  updateSingleNote,
  deleteSingleNote,
  getAllNotes,
} = require("../controllers/noteControllers");
const { verifyToken } = require("../middlewares/verifyToken");

router
  .route("/")
  .post(verifyToken, createNoteCtrl)
  .get(verifyToken, getAllNotes);

router
  .route("/:id")
  .get(verifyToken, getSingleNote)
  .put(verifyToken, updateSingleNote)
  .delete(verifyToken, deleteSingleNote);

module.exports = router;
