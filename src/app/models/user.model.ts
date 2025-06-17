import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";

const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },{
    _id: false,
  }
);

const userSchema = new Schema<IUser>({
    firstName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 60,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: addressSchema,
    },
  },{
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
