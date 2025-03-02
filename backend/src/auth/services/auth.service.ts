import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModels from "../models/user.models";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "client" | "delivery";
}

export const registerUserService = async (data: RegisterData) => {
  const { name, email, password, role } = data;
  // Check if user already exists
  const existingUser = await userModels.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new userModels({ name, email, password: hashedPassword, role });
  await user.save();
  return user;
};

interface LoginData {
  email: string;
  password: string;
}

export const loginUserService = async (data: LoginData) => {
  const { email, password } = data;
  const user = await userModels.findOne({ email });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  const payload = { userId: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return { token, role: user.role };
};
