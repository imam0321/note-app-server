import express, { Application, Request, Response } from "express";
import { notesRouters } from "./app/controllers/notes.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
