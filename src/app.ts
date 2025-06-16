import express, { Application, Request, Response } from "express";
import { notesRouters } from "./app/controllers/notes.controller";
import { usersRouters } from "./app/controllers/users.controller";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRouters);
app.use("/notes", notesRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
