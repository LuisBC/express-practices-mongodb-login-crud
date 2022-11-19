import { Router } from "express";
import {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditNoteForm,
  updateNote,
  deleteNote,
} from "../controllers/notes.controllers";
import { isAuthenticate } from "../helpers/auth";

const router = Router();

// New Note
router.get("/notes/add", isAuthenticate, renderNoteForm);
router.post("/notes/new-note", createNewNote);

// Get Notes
router.get("/notes", isAuthenticate, renderNotes);

// Edit Note
router.get("/notes/edit/:id", isAuthenticate, renderEditNoteForm);
router.put("/notes/edit/:id", isAuthenticate, updateNote);

// Delete Notesd
router.delete("/notes/delete/:id", isAuthenticate, deleteNote);

export default router;
