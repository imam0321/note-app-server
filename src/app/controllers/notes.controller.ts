import express, { Request, Response } from "express";
import { Note } from "../models/note.model";

export const notesRouters = express.Router();

notesRouters.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

notesRouters.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "All Notes",
    notes,
  });
});

notesRouters.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const notes = await Note.findById(noteId);

  res.status(200).json({
    success: true,
    message: "All Notes",
    notes,
  });
});

notesRouters.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const updatedData = req.body;

  const notes = await Note.findByIdAndUpdate(noteId, updatedData, {
    new: true,
  });

  res.status(201).json({
    success: true,
    notes,
  });
});

notesRouters.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const notes = await Note.findByIdAndDelete(noteId);

  res.status(200).json({
    success: true,
    message: "Note delete successfully",
    notes,
  });
});
