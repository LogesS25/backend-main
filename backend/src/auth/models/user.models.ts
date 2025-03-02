import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces/model.interfaces";
import { RoleEnums } from "../Enums/model.enums";

const userModels = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [RoleEnums.client, RoleEnums.client],
    default: "client",
  },
});

export default mongoose.model<IUser>("User", userModels);
