import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";

export const usersRouters = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

usersRouters.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await CreateUserZodSchema.parseAsync(req.body);

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

usersRouters.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "All Notes",
    users,
  });
});

usersRouters.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  res.status(200).json({
    success: true,
    user,
  });
});

usersRouters.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const user = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Update successfully",
    user,
  });
});

usersRouters.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User delete successfully",
    user,
  });
});
